<script setup>
definePageMeta({
    layout: 'login'
});

const { toLocal, live3 } = useTime();
const { deepCopy } = useCopy();

const data = ref([]);
const url = 'https://cdn.statically.io/gh/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/d2cd82b68091beb84ea4ef8bb276475accb84dd8/api/v2/all/livestreams/all.json';
const result = await useFetch(url, { method: 'GET' });
if (result.status.value === 'success') {
    const arr = deepCopy(result.data.value.livestreams);
    data.value = live3(arr);
    console.log(data.value);
}


// [
//     {
//         "id": "df0c2ce19ccf4e26ac1a18065f85dacc",
//         "name": "花咲くれは",
//         "imgUrl": "https://yt3.ggpht.com/QtrYkJ4AJASFGMgZ8wZ8qONf0ZRafbAO0Cr55IuzSwpr3678gLVyJW_3qblRKPBHsSft-hgf=s88-c-k-c0x00ffffff-no-rj",
//         "title": "【與re用餐】\\ 午餐時光到啦！今天吃什麼呢？ /【花咲くれは】",
//         "videoUrl": "https://www.youtube.com/watch?v=NdUPENZntyU",
//         "thumbnailUrl": "https://i.ytimg.com/vi/NdUPENZntyU/mqdefault_live.jpg",
//         "startTime": "2024-04-02T03:00:00.0000000+00:00"
//     },
//     {
//         "id": "2885972c2d0943e6b697bdc5e72c1d4a",
//         "name": "れっつま",
//         "imgUrl": "https://yt3.ggpht.com/fk3XFpRwE-5dZSu56PZR1WmnZdxWfWvMCcgIMhcgwO8XnPWXjU8fSNMVtzEz7yFTXk9Jt5mG2A=s88-c-k-c0x00ffffff-no-rj",
//         "title": "【露手】午休就由我來決定！讓我們聊聊天吧？ ＃烈芝麻 ＃新人Vtuber #台灣vtuber ＃日本人  【中文字幕/EN Subtitle】",
//         "videoUrl": "https://www.youtube.com/watch?v=3AnE1hlE5jk",
//         "thumbnailUrl": "https://i.ytimg.com/vi/3AnE1hlE5jk/mqdefault_live.jpg",
//         "startTime": "2024-04-02T04:00:00.0000000+00:00"
//     },
//     {
//         "id": "ef67b676c0334ef182151f473469c1f1",
//         "name": "尼皮",
//         "imgUrl": "https://yt3.ggpht.com/13HRZ4Pv0fQLHKz0O_sl1GMj91ZRhJmnqQZ8vmyXbCdAPGEQTzYdPhZJMzO0ovPNcMjYdMuvdA=s88-c-k-c0x00ffffff-no-rj",
//         "title": "【 #縦型配信 】NiPi Radio🎙️午間１２時☀️陪尼度過愜意下午✨ / 尼皮NiPi . ✖🔴✖",
//         "videoUrl": "https://www.youtube.com/watch?v=EAGR-yUxYg8",
//         "thumbnailUrl": "https://i.ytimg.com/vi/EAGR-yUxYg8/mqdefault_live.jpg",
//         "startTime": "2024-04-02T04:00:00.0000000+00:00"
//     }
// ]

</script>

<template>
    <section class="w:full h:100vh flex flex:col jc:center ai:center">
        <p>time</p>
    </section>
</template>