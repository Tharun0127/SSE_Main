import { HeroImageUploader } from "@/components/hero-image-uploader";
import { LogoUploader } from "@/components/logo-uploader";

export default function ContentManagementPage() {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <LogoUploader />
            <HeroImageUploader />
        </div>
    )
}
