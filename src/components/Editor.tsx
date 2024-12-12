import React from 'react';
import { Player } from '@remotion/player';
import { VideoComposition } from './VideoComposition';
import { PageEditor } from './PageEditor';
import { PageList } from './PageList';
import { ExportButton } from './ExportButton';
import { useVideoStore } from '../store/videoStore';
import { Settings, Play } from 'lucide-react';

export const Editor: React.FC = () => {
  const { project } = useVideoStore();

  // Calculate total frames only if project and pages exist
  const totalFrames = project?.pages?.reduce(
    (acc, page) => acc + page.duration * 30,
    0
  ) || 150; // Default to 5 seconds if no pages exist

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Pages
              </h2>
              <PageList />
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Page Settings</h2>
              <PageEditor />
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Play className="w-6 h-6 mr-2" />
                Preview & Export
              </h2>
              <ExportButton />
            </div>
            <div className="aspect-video">
              <Player
                component={VideoComposition}
                durationInFrames={totalFrames}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{
                  width: '100%',
                }}
                controls
                inputProps={{ project }}
                allowFullscreen
                clickToPlay
                renderMode="quality"
                muted={false}
                autoPlay={false}
                loop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};