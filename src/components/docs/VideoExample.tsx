import { Component, createSignal } from "solid-js";

interface VideoExampleProps {
  title: string;
  description?: string;
  sources: {
    src: string;
    type: string;
  }[];
  poster?: string;
  maxDuration?: number;
}

const VideoExample: Component<VideoExampleProps> = (props) => {
  const [isPlaying, setIsPlaying] = createSignal(false);

  return (
    <div>
      {props.title && (
        <div>
          <h2 style={{ "font-size": "24pt" }}>{props.title}</h2>
          {props.description && <h3>{props.description}</h3>}
        </div>
      )}
      <video
        controls
        preload="metadata"
        poster={props.poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width={"854"}
        height={"480"}
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
