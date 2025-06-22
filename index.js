const fs = require("fs");
const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

/**
 * Downloads a YouTube video as an MP4 file.
 * @param {string} youtubeUrl - The YouTube video URL.
 * @param {string} fileName - The output file name (should end with .mp4).
 * @returns {Promise<void>}
 */
async function downloadYouTubeVideo(youtubeUrl, fileName) {
  if (!ytdl.validateURL(youtubeUrl)) {
    throw new Error("Invalid YouTube URL");
  }
  if (!fileName.endsWith(".mp4")) {
    throw new Error("File name must end with .mp4");
  }
  return new Promise((resolve, reject) => {
    ytdl(youtubeUrl, { filter: "audioandvideo", quality: "highestvideo" })
      .pipe(fs.createWriteStream(fileName))
      .on("finish", resolve)
      .on("error", reject);
  });
}

/**
 * Downloads only the audio track from a YouTube video as an MP3 file.
 * @param {string} youtubeUrl - The YouTube video URL.
 * @param {string} fileName - The output file name (should end with .mp3).
 * @returns {Promise<void>}
 */
async function downloadYouTubeAudio(youtubeUrl, fileName) {
  if (!ytdl.validateURL(youtubeUrl)) {
    throw new Error("Invalid YouTube URL");
  }
  if (!fileName.endsWith(".mp3")) {
    throw new Error("File name must end with .mp3");
  }
  const stream = ytdl(youtubeUrl, {
    filter: "audioonly",
    quality: "highestaudio",
  });
  return new Promise((resolve, reject) => {
    ffmpeg(stream)
      .audioBitrate(128)
      .format("mp3")
      .on("end", resolve)
      .on("error", reject)
      .save(fileName);
  });
}

exports.downloadYouTubeAudio = downloadYouTubeAudio;
exports.downloadYouTubeVideo = downloadYouTubeVideo;