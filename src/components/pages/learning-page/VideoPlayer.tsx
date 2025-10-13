'use client';

import React from 'react';
import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import type { Lecture } from '@/types/schema/chapter.schema';
import { formatDuration } from '@/lib/utils';

interface VideoPlayerProps {
  lecture?: Lecture;
  onNext?: () => void;
  onPrevious?: () => void;
}

const VideoPlayer = ({ lecture, onNext, onPrevious }: VideoPlayerProps) => {
  if (!lecture) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Play size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Chọn bài giảng để bắt đầu học</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black">
      {/* Video Container */}
      <div className="aspect-video">
        {lecture.videoUrl ? (
          <iframe
            src={lecture.videoUrl}
            title={lecture.lectureName}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <Play size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Video không khả dụng</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls Overlay */}
      
    </div>
  );
};

export default VideoPlayer;
