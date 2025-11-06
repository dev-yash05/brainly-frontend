import { TwitterTweetEmbed } from "react-twitter-embed";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const extractTweetId = (raw: string): string | null => {
  if (!raw) return null;

  // Ensure URL has a scheme so URL() won't throw for "twitter.com/..."
  const candidate =
    raw.startsWith("http://") || raw.startsWith("https://")
      ? raw
      : `https://${raw}`;

  try {
    const url = new URL(candidate);
    const path = url.pathname || "";

    // 1) Typical form: /{user}/status/{id}
    let m = path.match(/\/status(?:es)?\/(\d+)/i);
    if (m && m[1]) return m[1];

    // 2) If last path segment is numeric, treat that as id
    const parts = path.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && /^\d+$/.test(last)) return last;

    // 3) Some share links put id in query param (rare): ?id=123
    const idParam = url.searchParams.get("id");
    if (idParam && /^\d+$/.test(idParam)) return idParam;

    // 4) Sometimes the ID is embedded in fragment like #!12345 (very rare)
    if (url.hash) {
      const hashMatch = url.hash.match(/(\d{5,})/);
      if (hashMatch) return hashMatch[1];
    }
  } catch (e) {
    // If URL parsing failed, try a final regex fallback on the raw string
    const fallback = raw.match(/status\/(\d+)/) || raw.match(/\/(\d{5,})$/);
    if (fallback && fallback[1]) return fallback[1];
  }

  return null;
};

// Helper to extract YouTube video ID from any valid link
const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  try {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  } catch {
    return null;
  }
};

const Card = ({ title, link, type }: CardProps) => {
  const tweetId = type === "twitter" ? extractTweetId(link) : null;

  // Debugging: log what we extracted — remove in production
  if (type === "twitter") {
    // eslint-disable-next-line no-console
    console.log("Twitter link:", link, "=> tweetId:", tweetId);
  }

  return (
    <div>
      <div className="px-4 py-6 bg-white rounded-md shadow-sm border border-slate-200 max-w-96">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center text-md font-medium text-gray-700">
            <div className="text-gray-500">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-gray-500">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500">
              <DeleteIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" &&
            (() => {
              const videoId = extractYouTubeId(link);
              if (!videoId)
                return (
                  <div className="p-4 border rounded bg-gray-50 text-sm text-gray-600">
                    Invalid YouTube link: {link}
                  </div>
                );

              return (
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              );
            })()}

          {type === "twitter" && tweetId ? (
            <TwitterTweetEmbed tweetId={tweetId} />
          ) : type === "twitter" ? (
            // Fallback UI so you can see there was a problem extracting the id
            <div className="p-4 border rounded bg-gray-50 text-sm text-gray-600">
              Could not extract Tweet ID from link.{" "}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Open original link
              </a>
              <div className="mt-2 text-xs text-gray-400">
                Check console for the debug log.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;

// import { TwitterTweetEmbed } from "react-twitter-embed";
// import { DeleteIcon } from "../icons/DeleteIcon";
// import { ShareIcon } from "../icons/ShareIcon";

// interface CardProps{
//     title: string;
//     link: string;
//     type: "twitter" | "youtube";
// }

// const Card = ({title, link, type}: CardProps) => {
//   return (
//     <div>
//       <div className="px-4 py-6 bg-white rounded-md shadow-sm border border-slate-200 max-w-96">
//         <div className="flex justify-between">
//           <div className="flex gap-1 items-center text-md font-medium text-gray-700">
//             <div className="text-gray-500">
//               <ShareIcon />
//             </div>
//             {title}
//           </div>
//           <div className="flex gap-1 items-center">
//             <div className="text-gray-500">
//               <a href={link} target="_blank"><ShareIcon /></a>
//             </div>
//             <div className="text-gray-500">
//               <DeleteIcon />
//             </div>
//           </div>
//         </div>
//         <div className="pt-4">
//           {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

//          {type === "twitter" && link && <TwitterTweetEmbed tweetId="1984304259437916196" />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
