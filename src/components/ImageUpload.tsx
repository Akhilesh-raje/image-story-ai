
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageUpload() {
  const [preview, setPreview] = useState<string>("/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png");
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview("");
  };

  return (
    <div className="w-full space-y-4">
      <Label htmlFor="image-upload" className="text-base font-medium text-gray-700 dark:text-gray-300">
        Upload Image
      </Label>
      
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragging 
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Input 
            id="image-upload"
            type="file" 
            onChange={handleUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop your image here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardContent className="p-0 relative">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              onClick={clearImage}
              variant="outline"
              size="sm"
              className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
