import React from 'react';
import { AbsoluteFill, Series, Sequence } from 'remotion';
import { SinglePage } from './SinglePage';
import { VideoProject } from '../types/video';

interface CompositionProps {
  project?: VideoProject;
}

export const VideoComposition: React.FC<CompositionProps> = ({ project }) => {
  if (!project || !project.pages) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#4F46E5',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 className="text-4xl font-bold text-white">Loading...</h1>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <Series>
        {project.pages.map((page) => (
          <Series.Sequence key={page.id} durationInFrames={page.duration * 30}>
            <Sequence from={0}>
              <SinglePage page={page} />
            </Sequence>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};