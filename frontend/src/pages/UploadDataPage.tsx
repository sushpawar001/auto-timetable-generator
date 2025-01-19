import GenerateTimetableCard from "../components/GenerateTimetableCard";
import TTScore from "../components/TTScore";
import UploadDataComponent from "../components/UploadDataComponent";

export default function UploadDataPage() {
    return (
        <div className="flex h-full md:overflow-hidden">
            <div className="grid w-full h-full gap-3 md:grid-cols-2 lg:grid-cols-3">
                <UploadDataComponent />
                <div className="flex flex-col h-full gap-3">
                    <TTScore />
                    <GenerateTimetableCard />
                </div>
            </div>
        </div>
    );
}
