# coreo-interno

## ffmpeg video encoding

- PC: `ffmpeg -i "PC GROUP 2 TAKE 2.mp4" -preset veryslow -g 600 -crf 26 -profile:v main -b:a 48k -pix_fmt yuv420p out-slow-a48k-crf26.mp4`
- PHONE: `ffmpeg -i "PHONE GROUP 1 TAKE 2.mp4" -vf scale=-1:360 -preset fast -g 600 -crf 26 -profile:v main -b:a 48k -pix_fmt yuv420p out-phone-fast-a48k-crf26.mp4`


