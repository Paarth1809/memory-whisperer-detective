
import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileType } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UploadMemoryDumpProps {
  onUploadComplete: (fileUrl: string, fileName: string, fileSize: number) => void;
}

const UploadMemoryDump: React.FC<UploadMemoryDumpProps> = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a memory dump file to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a unique file path with timestamp to prevent collisions
      const timestamp = new Date().getTime();
      const fileExtension = selectedFile.name.split('.').pop();
      const filePath = `${timestamp}_${selectedFile.name}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('memory_dumps')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            // Calculate the percentage
            const percentage = Math.floor((progress.loaded / progress.total) * 100);
            setUploadProgress(percentage);
          }
        });
        
      if (error) {
        throw error;
      }
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('memory_dumps')
        .getPublicUrl(filePath);
      
      toast({
        title: "Upload complete",
        description: "Memory dump ready for analysis."
      });
      
      // Pass the file URL, name and size to the parent component
      onUploadComplete(publicUrl, selectedFile.name, selectedFile.size);
      
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading the file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border border-cyber-blue/30 shadow-lg bg-cyber-dark">
      <CardHeader>
        <CardTitle className="text-cyber-blue cyber-text-shadow">Memory Dump Upload</CardTitle>
        <CardDescription>Upload a memory dump file (.dmp, .raw, .bin) for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-cyber-blue/40 rounded-lg p-8 text-center hover:border-cyber-blue/70 transition-colors">
          <input
            type="file"
            id="memory-dump-file"
            className="hidden"
            accept=".dmp,.raw,.img,.bin,.mem"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label 
            htmlFor="memory-dump-file" 
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            {selectedFile ? (
              <FileType size={48} className="text-cyber-blue mb-2" />
            ) : (
              <Upload size={48} className="text-cyber-blue mb-2" />
            )}
            
            <p className="text-lg font-medium mb-1">
              {selectedFile ? selectedFile.name : "Drop memory dump file here or click to browse"}
            </p>
            <p className="text-sm text-muted-foreground">
              {selectedFile ? 
                `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 
                "Supported formats: .dmp, .raw, .img, .bin, .mem"
              }
            </p>
          </label>
        </div>
        
        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="h-2 bg-secondary" />
            <p className="text-sm text-center mt-2 text-muted-foreground">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
          className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-medium"
        >
          {isUploading ? "Uploading..." : "Analyze Memory Dump"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadMemoryDump;
