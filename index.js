const { downloadYouTubeVideo, downloadYouTubeAudio } = require('./yt');
const path = require('path');

function printUsage() {
    console.log('Usage:');
    console.log('  node index.js --video <youtube_url> <output.mp4>');
    console.log('  node index.js --audio <youtube_url> <output.mp3>');
    process.exit(1);
}

const args = process.argv.slice(2);

if (args.length !== 3) {
    printUsage();
}

const [mode, url, output] = args;

if (!/^https?:\/\/(www\.)?youtube\.com|youtu\.be\//.test(url)) {
    console.error('Invalid YouTube URL.');
    process.exit(1);
}

if (mode === '--video') {
    downloadYouTubeVideo(url, output)
        .then(() => console.log(`Video downloaded to ${output}`))
        .catch(err => {
            console.error('Error downloading video:', err.message);
            process.exit(1);
        });
} else if (mode === '--audio') {
    downloadYouTubeAudio(url, output)
        .then(() => console.log(`Audio downloaded to ${output}`))
        .catch(err => {
            console.error('Error downloading audio:', err.message);
            process.exit(1);
        });
} else {
    printUsage();
}
