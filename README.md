# coreo-interno

- put `.mp4` and `.png` files into `media/`
- or set another folder for media files with `COREO_MEDIA_PATH=/abolute/path/to/media`
- run `meteor`

## ffmpeg video encoding

- PC: `ffmpeg -i "PC GROUP 2 TAKE 2.mp4" -preset veryslow -g 600 -crf 26 -profile:v main -b:a 48k -pix_fmt yuv420p out-slow-a48k-crf26.mp4`
- PHONE: `ffmpeg -i "PHONE GROUP 1 TAKE 2.mp4" -vf scale=-1:360 -preset veryslow -g 600 -crf 25 -profile:v main -b:a 48k -pix_fmt yuv420p out-phone-fast-a48k-crf25.mp4`

## install on dokku

remote:
````
 dokku apps:create coreo
 dokku config:set coreo BUILDPACK_URL=https://github.com/AdmitHub/meteor-buildpack-horse ROOT_URL=https://coreo.intergestalt.dev
 dokku storage:mount coreo /var/lib/dokku/data/storage/media/coreo:/app/media
 dokku mongo:create coreo
 dokku mongo:link coreo coreo
 ````
locally:
````
git remote add dokku dokku@intergestalt.dev:coreo
git push dokku
````
remote:
````
dokku letsencrypt:enable coreo
````
visit `https://coreo.intergestalt.dev`