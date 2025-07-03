
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function ImageUpload() {
  const [preview, setPreview] = useState<string>("/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <Label htmlFor="image-upload">Upload Image</Label>
      <Input 
        id="image-upload"
        type="file" 
        onChange={handleUpload}
        className="mt-2"
        accept="image/*"
      />
      {preview && (
        <Card className="mt-4">
          <CardContent className="p-0">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
