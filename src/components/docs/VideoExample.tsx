import { Component, createEffect } from "solid-js";

interface VideoExampleProps {
  title: string;
  description?: string;
  sources: {
    src: string;
    type: string;
  }[];
  poster?: string;
  maxDuration?: number;
  startTime?: number;
  endTime?: number;
}

const VideoExample: Component<VideoExampleProps> = (props) => {
  let videoRef: HTMLVideoElement | undefined;

  // Effect to handle start and end times
  createEffect(() => {
    if (!videoRef) return;

    const handleTimeUpdate = () => {
      if (!videoRef) return;

      // Check start time
      if (
        props.startTime !== undefined &&
        videoRef.currentTime < props.startTime
      ) {
        videoRef.currentTime = props.startTime;
      }

      // Check end time
      if (
        props.endTime !== undefined &&
        videoRef.currentTime >= props.endTime
      ) {
        videoRef.pause();
        videoRef.currentTime = props.startTime || 0;
      }
    };

    // Add event listener
    videoRef.addEventListener("timeupdate", handleTimeUpdate);

    // Cleanup
    return () => {
      videoRef?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  // Set initial time when video is ready
  const handleLoadedMetadata = () => {
    if (!videoRef) return;

    // Set to start time if provided
    if (props.startTime !== undefined) {
      videoRef.currentTime = props.startTime;
    }
  };

  return (
    <div>
      {props.title && (
        <div>
          <h2 style={{ "font-size": "24pt" }}>{props.title}</h2>
          {props.description && <h3>{props.description}</h3>}
        </div>
      )}
      <video
        ref={videoRef}
        controls
        preload="metadata"
        poster={props.poster}
        onLoadedMetadata={handleLoadedMetadata}
        width="100%"
        height="auto"
        style="max-width: 854px; max-height: 480px;"
      >
        {props.sources.map((source) => (
          <source src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoExample;
