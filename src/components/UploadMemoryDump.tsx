
import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Upload, FileType } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UploadMemoryDumpProps {
  onUploadComplete: (file: File, fileUrl: string) => void;
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
    setUploadProgress(0);
    
    try {
      // Create a unique filename to prevent collisions
      const fileExtension = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
      const filePath = `${fileName}`;

      // First, check if the bucket exists, if not, create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const memoryDumpsBucket = buckets?.find(bucket => bucket.name === 'memory_dumps');
      
      if (!memoryDumpsBucket) {
        const { error: createBucketError } = await supabase.storage.createBucket('memory_dumps', {
          public: true
        });
        
        if (createBucketError) {
          throw new Error(`Failed to create bucket: ${createBucketError.message}`);
        }
      }

      // Direct upload with progress tracking
      const { error: uploadError } = await supabase.storage
        .from('memory_dumps')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true,
          onProgress: (progress) => {
            if (progress.totalBytes > 0) {
              const percent = Math.round((progress.uploadedBytes / progress.totalBytes) * 100);
              setUploadProgress(percent);
            }
          },
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded file
      const { data } = supabase.storage
        .from('memory_dumps')
        .getPublicUrl(filePath);

      setIsUploading(false);
      toast({
        title: "Upload complete",
        description: "Memory dump ready for analysis."
      });
      
      // Call the onUploadComplete callback with the uploaded file and its URL
      onUploadComplete(selectedFile, data.publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
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
