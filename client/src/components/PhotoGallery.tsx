import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, X, AlertCircle, Check } from "lucide-react";
import rigImage from "@assets/generated_images/Oil_rig_platform_3ff05d82.png";

interface Photo {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "completed" | "error" | "oversized";
  progress?: number;
  url?: string;
  quality?: "good" | "warning" | "poor";
}

//todo: remove mock functionality
const mockPhotos: Photo[] = [
  {
    id: "1",
    name: "safety_valve_inspection.jpg",
    size: 856000,
    status: "completed",
    url: rigImage,
    quality: "good",
  },
  {
    id: "2", 
    name: "structural_check_wide.jpg",
    size: 1200000,
    status: "oversized",
    quality: "warning",
  },
  {
    id: "3",
    name: "equipment_detail.jpg", 
    size: 645000,
    status: "uploading",
    progress: 65,
  },
];

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    Array.from(files).forEach((file) => {
      const isOversized = file.size > 1000000; // 1MB limit
      const newPhoto: Photo = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        status: isOversized ? "oversized" : "uploading",
        progress: isOversized ? undefined : 0,
      };
      
      setPhotos(prev => [...prev, newPhoto]);
      
      if (!isOversized) {
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setPhotos(prev => prev.map(p => 
              p.id === newPhoto.id 
                ? { ...p, status: "completed", progress: 100, url: rigImage, quality: "good" }
                : p
            ));
          } else {
            setPhotos(prev => prev.map(p => 
              p.id === newPhoto.id ? { ...p, progress } : p
            ));
          }
        }, 200);
      }
    });
    
    // Clear input
    event.target.value = '';
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    return bytes > 1000000 
      ? `${(bytes / 1000000).toFixed(1)} MB` 
      : `${Math.round(bytes / 1000)} KB`;
  };

  const getQualityIcon = (quality?: string) => {
    switch (quality) {
      case "good":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning": 
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "poor":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Photo Gallery
          <Badge variant="secondary">
            {photos.filter(p => p.status === "completed").length} / {photos.length} uploaded
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover-elevate">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="photo-upload"
            data-testid="input-photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Upload inspection photos</p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag and drop files or click to browse. Max 1MB per photo.
            </p>
          </label>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <Card className={`overflow-hidden ${photo.status === "oversized" ? "border-destructive" : ""}`}>
                <div className="aspect-square bg-muted flex items-center justify-center">
                  {photo.url ? (
                    <img 
                      src={photo.url} 
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground">
                      {photo.status === "uploading" ? "Uploading..." : "No preview"}
                    </div>
                  )}
                </div>
                
                <div className="p-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-xs font-medium truncate flex-1">{photo.name}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removePhoto(photo.id)}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      data-testid={`button-remove-${photo.id}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className={photo.size > 1000000 ? "text-destructive" : ""}>
                      {formatFileSize(photo.size)}
                    </span>
                    {photo.quality && getQualityIcon(photo.quality)}
                  </div>
                  
                  {photo.status === "uploading" && photo.progress !== undefined && (
                    <Progress value={photo.progress} className="mt-2 h-1" />
                  )}
                  
                  {photo.status === "oversized" && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      File too large
                    </Badge>
                  )}
                  
                  {photo.quality === "warning" && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Quality warning
                    </Badge>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        {photos.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>No photos uploaded yet</p>
            <p className="text-sm">Add photos to document inspection findings</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}