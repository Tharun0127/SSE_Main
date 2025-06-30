
'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];

type ImageUploaderProps = {
    title: string;
    description: string;
    firestoreField: string;
    currentImageUrl: string | null;
    storagePath: string;
    maxSizeKB: number;
    aspectRatio?: 'aspect-square' | 'aspect-[4/3]' | 'aspect-video' | 'aspect-auto';
    onUploadSuccess: (field: string, url: string) => void;
};

function ImageUploaderCard({
    title,
    description,
    firestoreField,
    currentImageUrl,
    storagePath,
    maxSizeKB,
    aspectRatio = 'aspect-[4/3]',
    onUploadSuccess
}: ImageUploaderProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(currentImageUrl);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxSizeKB * 1024) {
            toast({ variant: 'destructive', title: 'File too large', description: `Image must be smaller than ${maxSizeKB}KB.` });
            return;
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
             toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please select a JPG, PNG, WEBP, or SVG file.' });
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = () => {
        if (!selectedFile) {
            toast({ variant: 'destructive', title: 'No file selected', description: 'Please choose an image to upload.' });
            return;
        }

        startTransition(async () => {
            try {
                const imageRef = ref(storage, `${storagePath}/${Date.now()}_${selectedFile.name}`);
                const snapshot = await uploadBytes(imageRef, selectedFile);
                const downloadURL = await getDownloadURL(snapshot.ref);

                await setDoc(doc(db, "settings", "content"), { [firestoreField]: downloadURL }, { merge: true });

                toast({ title: 'Image Updated!', description: `${title} has been successfully updated.` });
                onUploadSuccess(firestoreField, downloadURL);
                setSelectedFile(null);

            } catch (error) {
                console.error(`Failed to upload ${title}:`, error);
                toast({ variant: "destructive", title: "Upload Failed", description: "Could not save the new image. Please try again." });
                // Revert preview if upload fails
                setPreview(currentImageUrl);
            }
        });
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                    <Label>Current Image</Label>
                    <div className={cn("mt-2 relative w-full border rounded-md bg-muted overflow-hidden", aspectRatio)}>
                        {preview ? (
                            <Image src={preview} alt={`Current ${title}`} fill className="object-contain p-2" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No Image</div>
                        )}
                    </div>
                </div>
                <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                        <Label htmlFor={`file-${firestoreField}`}>Upload New Image</Label>
                        <Input id={`file-${firestoreField}`} type="file" accept={ACCEPTED_IMAGE_TYPES.join(',')} onChange={handleFileChange} />
                    </div>
                     <Button onClick={handleUpload} disabled={isPending || !selectedFile} className="w-full">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Upload className="mr-2 h-4 w-4" />
                        Update
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


export function SiteImageManager() {
    const [content, setContent] = useState<DocumentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const docRef = doc(db, 'settings', 'content');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContent(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching site content:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleUploadSuccess = (field: string, url: string) => {
        setContent(prev => ({ ...prev, [field]: url }));
    };

    if (isLoading) {
        return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-96" />)}
        </div>
    }

    const uploaderProps = [
        { section: "General", title: "Site Logo", description: "Used in header and footer. (Max 250KB, SVG/PNG preferred)", firestoreField: "logoUrl", storagePath: "site", maxSizeKB: 250, aspectRatio: 'aspect-auto' as const },
        { section: "Homepage", title: "Homepage Hero Image", description: "Main image on the homepage. (Max 2MB)", firestoreField: "heroImageUrl", storagePath: "site", maxSizeKB: 2048, aspectRatio: 'aspect-[4/3]' as const },
        { section: "Homepage", title: "'Why Choose Us' Image #1", description: "First feature image on homepage. (Max 512KB)", firestoreField: "whyChooseUsImage1", storagePath: "site", maxSizeKB: 512, aspectRatio: 'aspect-square' as const },
        { section: "Homepage", title: "'Why Choose Us' Image #2", description: "Second feature image on homepage. (Max 512KB)", firestoreField: "whyChooseUsImage2", storagePath: "site", maxSizeKB: 512, aspectRatio: 'aspect-square' as const },
        { section: "Homepage", title: "'Why Choose Us' Image #3", description: "Third feature image on homepage. (Max 512KB)", firestoreField: "whyChooseUsImage3", storagePath: "site", maxSizeKB: 512, aspectRatio: 'aspect-square' as const },
        { section: "About Page", title: "About Page Banner", description: "Top banner on the about page. (Max 2MB)", firestoreField: "aboutBannerImageUrl", storagePath: "site", maxSizeKB: 2048, aspectRatio: 'aspect-video' as const },
        { section: "About Page", title: "About Page 'Our Story' Image", description: "Image next to the story text. (Max 1MB)", firestoreField: "aboutStoryImageUrl", storagePath: "site", maxSizeKB: 1024, aspectRatio: 'aspect-square' as const },
        { section: "About Page", title: "Team Member Image #1", description: "Photo of the first team member. (Max 512KB)", firestoreField: "teamMemberImage1", storagePath: "team", maxSizeKB: 512, aspectRatio: 'aspect-square' as const },
        { section: "About Page", title: "Team Member Image #2", description: "Photo of the second team member. (Max 512KB)", firestoreField: "teamMemberImage2", storagePath: "team", maxSizeKB: 512, aspectRatio: 'aspect-square' as const },
        { section: "About Page", title: "Team Member Image #3", description: "Photo of the third team member. (Max 512KB)", firestoreField: "teamMemberImage3", storagePath: "team", maxSizeKB: 512, aspectRatio: 'aspect-square' as const },
    ];
    
    const sections = uploaderProps.reduce((acc, props) => {
        if (!acc[props.section]) {
            acc[props.section] = [];
        }
        acc[props.section].push(props);
        return acc;
    }, {} as Record<string, typeof uploaderProps>);

    return (
        <Accordion type="multiple" defaultValue={["General", "Homepage", "About Page"]} className="w-full space-y-4">
            {Object.entries(sections).map(([sectionTitle, propsList]) => (
                <AccordionItem key={sectionTitle} value={sectionTitle} className="border rounded-lg bg-card shadow-sm px-6">
                    <AccordionTrigger className="text-xl font-heading hover:no-underline">{sectionTitle} Images</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-4">
                            {propsList.map((props) => (
                                <ImageUploaderCard
                                    key={props.firestoreField}
                                    {...props}
                                    currentImageUrl={content?.[props.firestoreField] || null}
                                    onUploadSuccess={handleUploadSuccess}
                                />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

