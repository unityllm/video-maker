import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { VideoPage } from '../types/video';

interface SinglePageProps {
  page: VideoPage;
}

export const SinglePage: React.FC<SinglePageProps> = ({ page }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: page.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${titleY}px)`,
        }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-8">{page.title}</h1>
        <p className="text-2xl text-white">{page.text}</p>
      </div>
    </AbsoluteFill>
  );
};