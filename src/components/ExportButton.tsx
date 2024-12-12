import React, { useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import { ExportModal } from './ExportModal';
import { Player } from '@remotion/player';
import { VideoComposition } from './VideoComposition';

export const ExportButton: React.FC = () => {
  const { project } = useVideoStore();
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const totalFrames = project.pages.reduce(
    (acc, page) => acc + page.duration * 30,
    0
  );

  const handleExport = useCallback(() => {
    setIsExporting(true);
    setProgress(0);
    setStatus('Starting export...');

    const player = new Player({
      component: VideoComposition,
      inputProps: { project },
      durationInFrames: totalFrames,
      fps: 30,
      compositionWidth: 1920,
      compositionHeight: 1080,
    });

    player
      .renderVideo({
        downloadOnFinish: true,
        onProgress: ({ progress }) => {
          setProgress(Math.round(progress * 100));
          setStatus('Rendering video...');
        },
        onDownload: () => {
          setStatus('Download starting...');
          setTimeout(() => {
            setProgress(100);
            setStatus('Export complete!');
            setTimeout(() => {
              setIsExporting(false);
            }, 1500);
          }, 1000);
        },
      })
      .catch((err) => {
        console.error('Export failed:', err);
        setStatus('Export failed. Please try again.');
        setTimeout(() => {
          setIsExporting(false);
        }, 1500);
      });
  }, [project, totalFrames]);

  return (
    <>
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`flex items-center px-4 py-2 rounded-md text-white ${
          isExporting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        <Download className="w-4 h-4 mr-2" />
        {isExporting ? 'Exporting...' : 'Export MP4'}
      </button>

      <ExportModal
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        progress={progress}
        status={status}
      />
    </>
  );
};