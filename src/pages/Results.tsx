
import { useState, useEffect } from "react";
import { CaptionResponse } from "@/services/realCaptionService";
import ResultsHeader from "@/components/results/ResultsHeader";
import ImageAnalysisCard from "@/components/results/ImageAnalysisCard";
import CaptionVariationsCard from "@/components/results/CaptionVariationsCard";
import CustomizeExportCard from "@/components/results/CustomizeExportCard";

const Results = () => {
  const [captions, setCaptions] = useState<CaptionResponse[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<CaptionResponse | null>(null);
  const [customCaption, setCustomCaption] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [originalRequest, setOriginalRequest] = useState<any>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const savedCaptions = localStorage.getItem('generatedCaptions');
    const savedImage = localStorage.getItem('originalImage');
    const savedRequest = localStorage.getItem('originalRequest');
    
    if (savedCaptions) {
      const parsedCaptions = JSON.parse(savedCaptions) as CaptionResponse[];
      setCaptions(parsedCaptions);
      setSelectedCaption(parsedCaptions[0]);
      setCustomCaption(parsedCaptions[0]?.caption || "");
    }
    
    if (savedImage) {
      setOriginalImage(savedImage);
    }
    
    if (savedRequest) {
      setOriginalRequest(JSON.parse(savedRequest));
    }
  }, []);

  const handleCaptionSelect = (caption: CaptionResponse) => {
    setSelectedCaption(caption);
    setCustomCaption(caption.caption);
  };

  const handleCaptionsUpdate = (newCaptions: CaptionResponse[]) => {
    setCaptions(newCaptions);
    setSelectedCaption(newCaptions[0]);
    setCustomCaption(newCaptions[0]?.caption || "");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResultsHeader captionsCount={captions.length} />

        <div className="grid lg:grid-cols-4 gap-8">
          <ImageAnalysisCard 
            originalImage={originalImage}
            captionsCount={captions.length}
            selectedCaption={selectedCaption}
          />

          <CaptionVariationsCard 
            captions={captions}
            selectedCaption={selectedCaption}
            originalRequest={originalRequest}
            isRegenerating={isRegenerating}
            onCaptionsUpdate={handleCaptionsUpdate}
            onCaptionSelect={handleCaptionSelect}
            onRegeneratingChange={setIsRegenerating}
          />

          <CustomizeExportCard 
            selectedCaption={selectedCaption}
            originalRequest={originalRequest}
            customCaption={customCaption}
            onCustomCaptionChange={setCustomCaption}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
