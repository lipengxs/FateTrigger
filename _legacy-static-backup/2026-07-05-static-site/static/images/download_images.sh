#!/bin/bash

# 创建必要的目录
mkdir -p static/images/maps static/images/news static/images/awakeners

# 定义图片下载列表
declare -a images=(
    "jpg/illuminati_bg.d60uke53.jpg:static/images/"
    "jpg/map_bgallocationcenter.dc7jaei5.jpg:static/images/maps/"
    "png/map_bg.cotikl00.png:static/images/maps/"
    "png/weapon_video_bg.cmey_mhb.png:static/images/"
    "png/role_hxl.c_kmaujq.png:static/images/awakeners/"
    "png/role_kme.kdwhab7o.png:static/images/awakeners/"
    "png/role_ly.xbjzk7vu.png:static/images/awakeners/"
    "png/role_md.cdgbxyxk.png:static/images/awakeners/"
    "png/role_ml.dfbzpmis.png:static/images/awakeners/"
    "png/role_ql.by_aizja.png:static/images/awakeners/"
    "png/role_sewy.3ubeni5j.png:static/images/awakeners/"
    "png/role_x.chdtsq7z.png:static/images/awakeners/"
    "static_grwebsite.fatetrigger.com/web/1757499007290_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1756174170893_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1752089514746_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1726152132548_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1726152418620_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1726152185335_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1726152213205_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1735625404517_.jpg:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1726152038238_.png:static/images/news/"
    "static_grwebsite.fatetrigger.com/web/1735625410613_.jpg:static/images/news/"
)

# 下载图片
for item in "${images[@]}"; do
    IFS=':' read -r urlpath dest <<< "$item"
    filename=$(basename "$urlpath")
    
    # 检查文件是否已存在
    if [ -f "$dest$filename" ]; then
        echo "Skipping $filename (already exists)"
        continue
    fi
    
    url="https://fatetrigger.com/$urlpath"
    echo "Downloading $url to $dest$filename..."
    curl -L --max-time 60 --retry 3 "$url" -o "$dest$filename" 2>&1 | grep -E "(HTTP|curl)" || echo "Downloaded: $filename"
done

echo "Download complete!"
