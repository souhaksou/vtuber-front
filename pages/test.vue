<script setup>
definePageMeta({
    layout: 'login'
});

import dayjs from 'dayjs';

const getData = async () => {
    try {
        const response = await $fetch('https://randomuser.me/api/', {
            method: 'GET',
        });
        console.log('success', response);
    } catch (error) {
        console.error(error);
    }
};

const timeArray =
    [
        {
            "id": "6e51f06f6a02439d82b213b623cda4e8",
            "name": "安戈洛",
            "imgUrl": "https://yt3.ggpht.com/uAzBK5t1NaORO0OsZZhkuNx7pHC6viXrhNK8_rMGw729W5bLUlc0t-QnF0QXxNaGtZ-EvYHkcEk=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=JMRzakqG_YM",
            "thumbnailUrl": "https://i.ytimg.com/vi/JMRzakqG_YM/mqdefault_live.jpg",
            "startTime": "2024-04-01T15:00:00.0000000+00:00"
        },
        {
            "id": "51cd04cab0de47d4b2b5a156bbe2dfb0",
            "name": "森森觀月",
            "imgUrl": "https://yt3.ggpht.com/h1CelPCosBdWT85VCMZvG3ntLrP8y16wox6ttiDUPddzBJjO0sd9m_G0b0vpjDJSgRKOdXBhuCw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=kqkmAjFxtAo",
            "thumbnailUrl": "https://i.ytimg.com/vi/kqkmAjFxtAo/mqdefault_live.jpg",
            "startTime": "2024-04-01T15:00:00.0000000+00:00"
        },
        {
            "id": "b21dcc4162384eee9edd3ca7251795f2",
            "name": "諾亞·希爾維斯特",
            "imgUrl": "https://yt3.ggpht.com/5Ea_tq8dTI1TYrkFAa5V5-O1HwswAiJdU5by7ztnJ1ov_PZ3gvxh-zZ4YBu8kewjGw64ZhQhiA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=OJrGoXxgcp8",
            "thumbnailUrl": "https://i.ytimg.com/vi/OJrGoXxgcp8/mqdefault_live.jpg",
            "startTime": "2024-04-01T15:00:00.0000000+00:00"
        },
        {
            "id": "96ff628d2280470b833174c32200a749",
            "name": "艾爾法・戴蒙",
            "imgUrl": "https://yt3.ggpht.com/Boq6cZEOY4MXjr9HKDGcMlhk6sQmNQkHSc6xvzoosth5XBYOBymwIQQzBV4agWtNL7-oFLiRPw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=EeXGVIrlhu0",
            "thumbnailUrl": "https://i.ytimg.com/vi/EeXGVIrlhu0/mqdefault_live.jpg",
            "startTime": "2024-04-01T15:00:00.0000000+00:00"
        },
        {
            "id": "f5ff982730f54cd4826ff0530a4288c2",
            "name": "麵音白湯",
            "imgUrl": "https://yt3.ggpht.com/XSHfeVsxk-eDNndBjeeLlsqwQfrKKNWo_lZNEEqgsCeDoiJaZD1DGOJpTmocalx_fBMCIS_Ovw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=ugnx44FUkCM",
            "thumbnailUrl": "https://i.ytimg.com/vi/ugnx44FUkCM/mqdefault_live.jpg",
            "startTime": "2024-04-01T15:00:00.0000000+00:00"
        },
        {
            "id": "4865c3feac234584909168181b7dc2be",
            "name": "東禪寺陽",
            "imgUrl": "https://yt3.ggpht.com/UeEcjY1M2Ncm5JlTnmep04ATkzRh7r3XMN4F0bZUatSXp1lc-GlSV7mTdVpkW278FUPgrdWr=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=bzHB4Rv4bbM",
            "thumbnailUrl": "https://i.ytimg.com/vi/bzHB4Rv4bbM/mqdefault.jpg",
            "startTime": "2024-04-01T15:59:07.0000000+00:00"
        },
        {
            "id": "8489d002b1704612bd0dd23f9a14ed51",
            "name": "亀吉卯太郎",
            "imgUrl": "https://yt3.ggpht.com/86zmHBG2mZroYAhojErhvlI87-L4JDlywPXIwnjobSvYJ8-iE1jhWGxYGJrj9OJb3TPoFJ3e=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=ZVgGTj_JCQM",
            "thumbnailUrl": "https://i.ytimg.com/vi/ZVgGTj_JCQM/mqdefault.jpg",
            "startTime": "2024-04-01T16:05:00.0000000+00:00"
        },
        {
            "id": "7c18bc597298484c8f2925759fc1ac4a",
            "name": "牙羽",
            "imgUrl": "https://yt3.ggpht.com/aJLBK0bAmsI7vI0X3Hydz0A-tXZeIWHeTi68Q_HANoBGbO-E6SDxI7eRPcEc9wBJs5v2kWrz3g=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=sYZ03hx8H68",
            "thumbnailUrl": "https://i.ytimg.com/vi/sYZ03hx8H68/mqdefault_live.jpg",
            "startTime": "2024-04-01T19:40:00.0000000+00:00"
        },
        {
            "id": "843d99233b474827a2f0bc417ffd3852",
            "name": "五十鈴抹茶",
            "imgUrl": "https://static-cdn.jtvnw.net/jtv_user_pictures/cac6746b-87e8-4c65-9dce-38effcf07ae0-profile_image-300x300.png",
            "videoUrl": "https://www.youtube.com/watch?v=6EreJcYngPA",
            "thumbnailUrl": "https://i.ytimg.com/vi/6EreJcYngPA/mqdefault.jpg",
            "startTime": "2024-04-01T23:00:00.0000000+00:00"
        },
        {
            "id": "c65e7caaf81a43249d5132b9fe312b24",
            "name": "藤倉ウルカ",
            "imgUrl": "https://yt3.ggpht.com/WNG8G6hOhsw-CqEMWF26QPUfuFcU74ALzydzTBuDB4TNQDOQWygmlDZnUytvdccH5ckrh95D=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=UMmIf0ZSs88",
            "thumbnailUrl": "https://i.ytimg.com/vi/UMmIf0ZSs88/mqdefault_live.jpg",
            "startTime": "2024-04-02T00:00:00.0000000+00:00"
        },
        {
            "id": "5d2231ea88fd474d8a11e5a759899216",
            "name": "十六月 OctJun",
            "imgUrl": "https://yt3.ggpht.com/-YRO-Mlyo1eViZVnc3Ya15It5dWTGRW8gRps_S9d9mriT6bwp4tybqjZNH005WLzq31-4-MQWw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=_fycl_Td4OQ",
            "thumbnailUrl": "https://i.ytimg.com/vi/_fycl_Td4OQ/mqdefault_live.jpg",
            "startTime": "2024-04-02T01:00:00.0000000+00:00"
        },
        {
            "id": "a5f7302f9f1a4fcdb2471c4bc52a05fb",
            "name": "玖璐",
            "imgUrl": "https://yt3.ggpht.com/1AERPgS8e1yy_iJE_LoF2Gfu3KOQyZD--yMVXZdkJixD24cLM1ZQcHoZJbB2dZd7S-P_FX8fKQ=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=6uGxeiy_-80",
            "thumbnailUrl": "https://i.ytimg.com/vi/6uGxeiy_-80/mqdefault_live.jpg",
            "startTime": "2024-04-02T01:00:00.0000000+00:00"
        },
        {
            "id": "c5fe413a473d4638b53fb3f9019aabbe",
            "name": "帕蘿妮",
            "imgUrl": "https://yt3.ggpht.com/67hW6QrdObpCY-bPdzNPG9aE8IiXzsYJ_vZVtM79aerirxr5fgEk6U8tHdETzOKU_lwVKjpJauw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=i7XhHCUy9nY",
            "thumbnailUrl": "https://i.ytimg.com/vi/i7XhHCUy9nY/mqdefault_live.jpg",
            "startTime": "2024-04-02T03:00:00.0000000+00:00"
        },
        {
            "id": "8c3af9f56a3f4f1d84fcfcfa9f280c8d",
            "name": "星間菖蒲＆紙野愛理",
            "imgUrl": "https://yt3.ggpht.com/oYHlJLlyRJGjUSg8yWe-U3c6tEThRULnkMs-e2jmBnl1K6a5Sd7zpkwfG3HewqZLeZnk3FNmLA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=DjZGLztQOME",
            "thumbnailUrl": "https://i.ytimg.com/vi/DjZGLztQOME/mqdefault_live.jpg",
            "startTime": "2024-04-02T05:00:00.0000000+00:00"
        },
        {
            "id": "7f9d223a684e44e8b8d30bedcc07f1fa",
            "name": "柴可chako",
            "imgUrl": "https://yt3.ggpht.com/R9zK14kOpKIryHW_EbhjVsq4nOHS6hcZfsx8ZoWNausgZBiUidk-VP6fnX1Q1l4_g_GmgwK-aA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=xpwpbDScBjc",
            "thumbnailUrl": "https://i.ytimg.com/vi/xpwpbDScBjc/mqdefault_live.jpg",
            "startTime": "2024-04-02T06:00:00.0000000+00:00"
        },
        {
            "id": "506d9c6fdbd34c8aa5fda64d90d96ac2",
            "name": "エイフカイマン",
            "imgUrl": "https://yt3.ggpht.com/y8NSFtx3IU7YSa4LClIzlOwhEr7O72aChjyvhImfHlfmGSZCHvivhAlLarJLCckXidDJYgKXfw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=e1RlwVqeBPE",
            "thumbnailUrl": "https://i.ytimg.com/vi/e1RlwVqeBPE/mqdefault_live.jpg",
            "startTime": "2024-04-02T08:00:00.0000000+00:00"
        },
        {
            "id": "420208d1dcb74abfa325fc1f6a27e17b",
            "name": "麻糬山丘",
            "imgUrl": "https://yt3.ggpht.com/OUiJ78_vaX27QczASFLJdauy0Xk6PToXAHVADT4gxIYOdRyhJAFiSog9h71s0QDFs4K35_tAQg=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=r0Kz6U3-tLY",
            "thumbnailUrl": "https://i.ytimg.com/vi/r0Kz6U3-tLY/mqdefault_live.jpg",
            "startTime": "2024-04-02T08:30:00.0000000+00:00"
        },
        {
            "id": "d475848a566848dc9f6ad02707d87e2a",
            "name": "Ding",
            "imgUrl": "https://yt3.ggpht.com/E7QHhC26SV079Q7eAORYWWnqOzICN-qKmUbdRQfL5ni51bqXz0DGv1d0pTDMGTOEZ64MSngNUw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=jwjlWojs2vo",
            "thumbnailUrl": "https://i.ytimg.com/vi/jwjlWojs2vo/mqdefault_live.jpg",
            "startTime": "2024-04-02T09:00:00.0000000+00:00"
        },
        {
            "id": "139f3f1818a2420aa35d5471adaf1a73",
            "name": "愛庫娃",
            "imgUrl": "https://yt3.ggpht.com/-ulrAfZQFNrU6tE6UgEyPab1d998zEWgeLHbiDSK3_M2VXY1UnZa-ek0ZW-ie0SUzC08jHuzstI=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=prMpZlOQJ7s",
            "thumbnailUrl": "https://i.ytimg.com/vi/prMpZlOQJ7s/mqdefault_live.jpg",
            "startTime": "2024-04-02T09:00:00.0000000+00:00"
        },
        {
            "id": "8bf9e6165251449daa9b1b36af10e5bd",
            "name": "伊香いくら",
            "imgUrl": "https://yt3.ggpht.com/4bPDd5U3FQX3LdMdegm-ePPdtLDmX3XZeI6Sv-xGgCrnsWM5ykYuUCbUvZzhD1mo8g8bz2a-5g=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=kSIUvzxkvHQ",
            "thumbnailUrl": "https://i.ytimg.com/vi/kSIUvzxkvHQ/mqdefault_live.jpg",
            "startTime": "2024-04-02T10:00:00.0000000+00:00"
        },
        {
            "id": "59005edeef174395915757d45718177d",
            "name": "卯月瑠花",
            "imgUrl": "https://yt3.ggpht.com/1LAo5GlukFn1YAv5jTO-84kaomg12jxPriidqKbmjI9nNyA0pXGm5aksPPhmnq4EOpQalCGNZlY=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=gmTcn-lJdQg",
            "thumbnailUrl": "https://i.ytimg.com/vi/gmTcn-lJdQg/mqdefault_live.jpg",
            "startTime": "2024-04-02T10:30:00.0000000+00:00"
        },
        {
            "id": "8150f530d858418282811429cc32622b",
            "name": "欣希亞",
            "imgUrl": "https://yt3.ggpht.com/ReKO8AzIpCJPQ3k16YI6PcAQk1xc3jgRVVTrNf7vvNLmg-SI9Hu3CD7iKWJP3wsUU0w6EUwF80s=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=r0ts6nw0FN8",
            "thumbnailUrl": "https://i.ytimg.com/vi/r0ts6nw0FN8/mqdefault_live.jpg",
            "startTime": "2024-04-02T10:45:00.0000000+00:00"
        },
        {
            "id": "05be4fb717614738a87daac46157ddb1",
            "name": "藥師寺丹",
            "imgUrl": "https://yt3.ggpht.com/U1avO5Pf15jT9NOykDlP7sDaPZ2fwM015VZao8yJ6Q_By7IkBKWVgMA0Iu-WDwGJgRY-JzlPHg=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=PQOXx76j_w4",
            "thumbnailUrl": "https://i.ytimg.com/vi/PQOXx76j_w4/mqdefault_live.jpg",
            "startTime": "2024-04-02T11:00:00.0000000+00:00"
        },
        {
            "id": "6b8922c9532e435eb4f03cabc8bb23b1",
            "name": "浅海コラル",
            "imgUrl": "https://static-cdn.jtvnw.net/jtv_user_pictures/cf05f648-0f74-4a59-85b3-a63568bc8d5d-profile_image-300x300.png",
            "videoUrl": "https://www.youtube.com/watch?v=dlywXB3a4iA",
            "thumbnailUrl": "https://i.ytimg.com/vi/dlywXB3a4iA/mqdefault_live.jpg",
            "startTime": "2024-04-02T11:00:00.0000000+00:00"
        },
        {
            "id": "45dc3a8a88054fc6adf55549304aca1c",
            "name": "矢泽狭久",
            "imgUrl": "https://yt3.ggpht.com/wYdIsa1ggoEbqD3-s4jrvXZC_Dr6lmgNRZABpQRhdmuy69BMa_uZ3zNthpEq0z7hcriEwclgZfY=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=plaU4K8o1Zk",
            "thumbnailUrl": "https://i.ytimg.com/vi/plaU4K8o1Zk/mqdefault.jpg",
            "startTime": "2024-04-02T11:00:00.0000000+00:00"
        },
        {
            "id": "afb88fe247b6416e8b9156a9a7e60f38",
            "name": "編號:753",
            "imgUrl": "https://yt3.ggpht.com/fIJmgcE0wjQsyVkR5mI0E2CTDM4UrOEYafG0gfmVGvkpk6c46O-oXQiFFcP_v3YQqedy_iMvAw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=PlxnBr-2kIY",
            "thumbnailUrl": "https://i.ytimg.com/vi/PlxnBr-2kIY/mqdefault.jpg",
            "startTime": "2024-04-02T11:00:00.0000000+00:00"
        },
        {
            "id": "b3c1a09b09a54b9a8078d3310d151efe",
            "name": "天羽璃歌",
            "imgUrl": "https://yt3.ggpht.com/HrCfwluE9eQ7c2Nl890Ewal7hxX9BA7D8F0320QO32I5VzQiacB3YO0NdwNZiBkys5S8ydGs=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=q-Z9wV6SQ2U",
            "thumbnailUrl": "https://i.ytimg.com/vi/q-Z9wV6SQ2U/mqdefault_live.jpg",
            "startTime": "2024-04-02T11:30:00.0000000+00:00"
        },
        {
            "id": "45dc3a8a88054fc6adf55549304aca1c",
            "name": "矢泽狭久",
            "imgUrl": "https://yt3.ggpht.com/wYdIsa1ggoEbqD3-s4jrvXZC_Dr6lmgNRZABpQRhdmuy69BMa_uZ3zNthpEq0z7hcriEwclgZfY=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=nCHfLefMtXw",
            "thumbnailUrl": "https://i.ytimg.com/vi/nCHfLefMtXw/mqdefault_live.jpg",
            "startTime": "2024-04-02T11:30:00.0000000+00:00"
        },
        {
            "id": "e14d4aac184c4ccdba6f2a9718cfea62",
            "name": "鯨諾",
            "imgUrl": "https://yt3.ggpht.com/q1F28KBB2aGDADIzUrg8uTlNCV5WIHQx9V8PDD2KJKke4mJkQ_RkffOcyVsOSo53oABfmW9_=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=cNrjZpU7lQ0",
            "thumbnailUrl": "https://i.ytimg.com/vi/cNrjZpU7lQ0/mqdefault.jpg",
            "startTime": "2024-04-02T11:30:00.0000000+00:00"
        },
        {
            "id": "247215e876d24dae9932464b75fc577c",
            "name": "高維爾",
            "imgUrl": "https://yt3.ggpht.com/p8oQS9IiBFEReXhjrmi_BtGryOYVIUQrntBOCleJwTAu9F83WAcy1gkgf--lBG19MiRNscxqAA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=-3IP0bCFlM8",
            "thumbnailUrl": "https://i.ytimg.com/vi/-3IP0bCFlM8/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "04ca68439fd14d088c77eb0069e6414f",
            "name": "Yoko",
            "imgUrl": "https://yt3.ggpht.com/HZ45G-418GVSXE0ApTGQO6d2Ka2iXx5FVJXlv39iYsfHSAUrpXZWU8BXgu4hNXvErVZAwkVc=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=oxt78CZoJgI",
            "thumbnailUrl": "https://i.ytimg.com/vi/oxt78CZoJgI/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "ebe5c5f9d67f44f3bc5e70b413ce9df7",
            "name": "依可露",
            "imgUrl": "https://yt3.ggpht.com/S5yODWA63sBw9IkT0xxroT7VkQj2eyFtN7PfswAm3IZgeyxDEXxu9U_9TCVrM1ZVO01BiAy5_H8=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=H94OmpGAnTM",
            "thumbnailUrl": "https://i.ytimg.com/vi/H94OmpGAnTM/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "7c06b9e316ce4ac18ce836cd72442bbe",
            "name": "浠Mizuki",
            "imgUrl": "https://yt3.ggpht.com/QepYNlHL5znbTofU4GKoS1WcVBmFGGX6w1hcHKrwGHmGmK04xQgJ5B1cA3o0V1mchEK55f3UeA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=UXnf7hGpdUA",
            "thumbnailUrl": "https://i.ytimg.com/vi/UXnf7hGpdUA/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "533e7b1b50ba448292c09c5845d68eb6",
            "name": "夢乃梓宣",
            "imgUrl": "https://yt3.ggpht.com/Qb6RY1aP02AVZeqAk1nlQ7Wzj4pqQppk_SUdzGRQBkmoufwuiefZXKPQYPqtqL78jdQiJ3ELmJk=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=oLPu_Cn36tw",
            "thumbnailUrl": "https://i.ytimg.com/vi/oLPu_Cn36tw/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "a9e5491563fd4b05896ef9a8cb2ee7d7",
            "name": "曦卡Sica",
            "imgUrl": "https://yt3.ggpht.com/a7B-dJKsLnJi9e0iJiOBuLo8Rc0sj2lABFhQB0OVMpGCITTdTv2UUfGor1Dg_sZXFUMtorSsIw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=QOXYWERKf9A",
            "thumbnailUrl": "https://i.ytimg.com/vi/QOXYWERKf9A/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "f2dc08b1c55843d9a3d1e0461ebf57c1",
            "name": "可希",
            "imgUrl": "https://yt3.ggpht.com/MveJ22l_a5hqD-5uV6WR3NRdLv1UjlCYxr02OFck2atkALp60RRLnNWvap0syv42QOZtLVF8=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=lww1559q0uQ",
            "thumbnailUrl": "https://i.ytimg.com/vi/lww1559q0uQ/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "d96ffd71ce0d4f508b270703149a6669",
            "name": "蘇米",
            "imgUrl": "https://yt3.ggpht.com/SXWmGpunnuUd8d6QbVn4MO4NFSZIRA42fAOinzZKFvibwHo8_sXpzcyaqkQmrFKswJMg9mUnsA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=GKjKDyfhSvk",
            "thumbnailUrl": "https://i.ytimg.com/vi/GKjKDyfhSvk/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "8c3af9f56a3f4f1d84fcfcfa9f280c8d",
            "name": "星間菖蒲＆紙野愛理",
            "imgUrl": "https://yt3.ggpht.com/oYHlJLlyRJGjUSg8yWe-U3c6tEThRULnkMs-e2jmBnl1K6a5Sd7zpkwfG3HewqZLeZnk3FNmLA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=EStEhQH91-w",
            "thumbnailUrl": "https://i.ytimg.com/vi/EStEhQH91-w/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "dfc411c6b5d24d97b944f527ddfd2f0b",
            "name": "泉川喵",
            "imgUrl": "https://yt3.ggpht.com/eOZd4MQFEnMrkK5YIsnC-TuwzqwJOjpf1cere1WWSsm1teT7b-UcBMLg5lOKrkIjCeK1zHivv0k=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=ePekCG67gow",
            "thumbnailUrl": "https://i.ytimg.com/vi/ePekCG67gow/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "95df3846ff6644429227e9e058994ad8",
            "name": "擦布微糖",
            "imgUrl": "https://yt3.ggpht.com/YY4uCa3-BKIwAaFvIQEYe8-UTd0VOUrebqGRSvTKTmTPTT4zbX5842qZsZ6cQ0_2yvVvs1n_GFc=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=39LC7YOWt-U",
            "thumbnailUrl": "https://i.ytimg.com/vi/39LC7YOWt-U/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "c1ca3c2282084d0ebbdeb3896801aec9",
            "name": "栗歐菈",
            "imgUrl": "https://yt3.ggpht.com/eVGE1RWiEvKNFL4azZ7ZYUypm7vI3QBbWrOV13rA-68_7EQDCsQwzWpu6Ev3FYsBpEdRCaKtXs0=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=urxHaNZ8ExA",
            "thumbnailUrl": "https://i.ytimg.com/vi/urxHaNZ8ExA/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:00.0000000+00:00"
        },
        {
            "id": "664e1b310cf343b78623f99b31e40fae",
            "name": "迪鹿",
            "imgUrl": "https://yt3.ggpht.com/ytc/AIdro_mCWGMWV1207kc9KiySPmNFjYzQq_mXhgsWe22L=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=6Gjh4Q_Go9E",
            "thumbnailUrl": "https://i.ytimg.com/vi/6Gjh4Q_Go9E/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:00:23.0000000+00:00"
        },
        {
            "id": "6cd8cdc530d14e2d9d0a9cd20cb6b05c",
            "name": "名無シユキ",
            "imgUrl": "https://yt3.ggpht.com/iQKmFL4e6AeVz_eWxDcfnX1hV_yEi0nMmjb0R0P7Zi06_i2d-s1b-BIxzYRQZKM4WAUL1NZvhek=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=zzRaYxr9yZk",
            "thumbnailUrl": "https://i.ytimg.com/vi/zzRaYxr9yZk/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:30:00.0000000+00:00"
        },
        {
            "id": "e3451dd6f3c0444c888eb6f67704613a",
            "name": "亞雪",
            "imgUrl": "https://yt3.ggpht.com/ucNhDb6GcT-8AOhL6zhjI1LChKrxhODNoV_mpgVaLjXVtaM34H-HRGSKrx40E57Ogcu9oZB3xA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=kzGVtR2cABM",
            "thumbnailUrl": "https://i.ytimg.com/vi/kzGVtR2cABM/mqdefault_live.jpg",
            "startTime": "2024-04-02T12:30:00.0000000+00:00"
        },
        {
            "id": "fbb142bcb07a4808b0164c41ab1877ea",
            "name": "多多栗茲",
            "imgUrl": "https://yt3.ggpht.com/iO1oFAQRhTlSgJ6t940cJGy1s0wNh5SpNSm_hdoY70h9HRTjKfFLGywnmRoWIpm95rFANpWqog=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=kte7c6diXxI",
            "thumbnailUrl": "https://i.ytimg.com/vi/kte7c6diXxI/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "93a4d479e67242d58d3ff80307d3bc84",
            "name": "月藏藏",
            "imgUrl": "https://yt3.ggpht.com/UCM3zW2emyuk13Abmqng05eGQikzLt2GtSrjrH2wAAd5J0EUamEuBvBEAKo3ilgc0JGds5dx3Q=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=axhZJoc91w8",
            "thumbnailUrl": "https://i.ytimg.com/vi/axhZJoc91w8/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "118c05e7f751446abee5fc827fda0215",
            "name": "獅子山 Rio",
            "imgUrl": "https://yt3.ggpht.com/dufcxH75NxCu_K5RonC8pA_arkGM6V0mZ_LpdFGpl9IQnoydwkUUODzeCbA4R4ZQyVSwMk4ngA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=5BqXrc9PJA4",
            "thumbnailUrl": "https://i.ytimg.com/vi/5BqXrc9PJA4/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "eda6bf91049349e08f0f269fb4f8c0f9",
            "name": "風鈴芽依",
            "imgUrl": "https://yt3.ggpht.com/yQHzv9OI-cHUBTyWLp6XjoK899oTbrvtLMhpJiqLqEQqFOAuRQObsdvHQNt-JNtZd9HpMZPDlw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=lrJQXZvOVyo",
            "thumbnailUrl": "https://i.ytimg.com/vi/lrJQXZvOVyo/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "cb52afa541704e6e8f1098a20679135c",
            "name": "阿紋",
            "imgUrl": "https://yt3.ggpht.com/ytc/AIdro_kfypAJx-vUTTjDPXcuuVNV5hiNEsu-LbVv6i2lxA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=1NqQTuFFUWM",
            "thumbnailUrl": "https://i.ytimg.com/vi/1NqQTuFFUWM/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "9e05802075c343a3bf2778550d5157da",
            "name": "花川夢姬",
            "imgUrl": "https://yt3.ggpht.com/9Qeb2b8qLjd-fluCUAOIVyXLqpsOxv-7rySEm_RzNMQyjVDcV6mgyApeNDA3-N0Gsefl3GAdkA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=AKewpLoDEG4",
            "thumbnailUrl": "https://i.ytimg.com/vi/AKewpLoDEG4/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "5226367de740445789ec9b65a84d65c5",
            "name": "柚晞Yuzuki",
            "imgUrl": "https://yt3.ggpht.com/uml5hofZLwvyVUAWa-Eiyko2h6VF_X5DqXbMM3LbIyohowkRhp2ywsn_GCGRayJcjEd-qz4_DA=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=nUTErrSsEZA",
            "thumbnailUrl": "https://i.ytimg.com/vi/nUTErrSsEZA/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "ee7cfe445bc84d6fa7fff5df6fbf0d32",
            "name": "水樹椿",
            "imgUrl": "https://yt3.ggpht.com/GSEVOFUfPq2ts708H1N8MIBgCWRwpDp8K_qH7tiSBb4dse_fr5Jf46aPSO23VhGHgDlJmWgtmM0=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=FQEty20WBgg",
            "thumbnailUrl": "https://i.ytimg.com/vi/FQEty20WBgg/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "d80f5bc1e3ce4c35aa3eced40cc3bddc",
            "name": "司淇",
            "imgUrl": "https://yt3.ggpht.com/iqRUVkoWiNaY6prf0wJjBl_purcw85Am1NnQzXVKi_v_O923BpRDfxxRCOYl6-JuBQ6YI9e4rwQ=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=6KfNHVEW-Po",
            "thumbnailUrl": "https://i.ytimg.com/vi/6KfNHVEW-Po/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "a5f7302f9f1a4fcdb2471c4bc52a05fb",
            "name": "玖璐",
            "imgUrl": "https://yt3.ggpht.com/1AERPgS8e1yy_iJE_LoF2Gfu3KOQyZD--yMVXZdkJixD24cLM1ZQcHoZJbB2dZd7S-P_FX8fKQ=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=Tb6xihamTwQ",
            "thumbnailUrl": "https://i.ytimg.com/vi/Tb6xihamTwQ/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "658e63bebdca421ca934b0bf6aa2bcd8",
            "name": "灰妲",
            "imgUrl": "https://yt3.ggpht.com/usrPN9Vwg863dZB7tNw1u5fspyWgOr85Ei0St_ZSdirBbbuEFfkuY_p6OSJhpC7lAAiMX0zPlSk=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=Zqzte3-roxk",
            "thumbnailUrl": "https://i.ytimg.com/vi/Zqzte3-roxk/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "73b97b1a35c84579aa8ffcd6534efad3",
            "name": "小金碧碧",
            "imgUrl": "https://yt3.ggpht.com/AcRMaAE72N9o-WZZMDpLNR6KL9Cg3CJyn3TElmryswQTGKZdfN2vPE9UNc2hCk4jSu6-uosc3g=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=w510O7ibXbM",
            "thumbnailUrl": "https://i.ytimg.com/vi/w510O7ibXbM/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "7ae1c13d53fb44f49f386eef43c63ee4",
            "name": "颜斯",
            "imgUrl": "https://yt3.ggpht.com/8oBQ5D0HsMJAh4P2sj-3-uVULjsFwt6WPhI_q00Og413-a12SFFeJDCdZQqDa6Njj3kZh37H=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=Kfm7QLh5xjU",
            "thumbnailUrl": "https://i.ytimg.com/vi/Kfm7QLh5xjU/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "f2a403cb46354371837550730a397bd1",
            "name": "小林冰",
            "imgUrl": "https://yt3.ggpht.com/6QOnEJ77-7W5Ldsr_qly78Sj0VFuKoA2tBm7CogyvucyMLtvuwtNZlUTPohSl6wuR5GyUxr4MTw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=yEO7U6L8yO4",
            "thumbnailUrl": "https://i.ytimg.com/vi/yEO7U6L8yO4/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "8fd3526ba2074df896bbcb47e713565b",
            "name": "Ooniau暖暖",
            "imgUrl": "https://yt3.ggpht.com/iqC25byfC5V8UyNzJy_CkOPrV7bp5DoBUkTB6SRKQyY7V5KVzXshjkfX6x5jNjfJczBLsl5d=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=cjQ_qPAZgl4",
            "thumbnailUrl": "https://i.ytimg.com/vi/cjQ_qPAZgl4/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:00.0000000+00:00"
        },
        {
            "id": "993abf9d9dd84cccae3b8cbba00df320",
            "name": "白石幽怜",
            "imgUrl": "https://yt3.ggpht.com/4U3Yydq8pIpKcoCrhBm_I6hXq8PUqccyjYdcANTV56wRxLbpTCXD2RaBtZD9FEy1MmcrC05y=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=7qNqn8qP2FI",
            "thumbnailUrl": "https://i.ytimg.com/vi/7qNqn8qP2FI/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:00:09.0000000+00:00"
        },
        {
            "id": "b2313ef4c37542c89796ae94dfb8228d",
            "name": "亞諾・歐托亞",
            "imgUrl": "https://yt3.ggpht.com/0CoQCca534JdyEJi0Wnd1ORxEdqVcx_Mh3B5QD_PbUtlZAS6U22RFacyiGjy3gs5yxsLAABfyw=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=DL6-qXLt4z0",
            "thumbnailUrl": "https://i.ytimg.com/vi/DL6-qXLt4z0/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:30:00.0000000+00:00"
        },
        {
            "id": "2ee2acc29fac42c5b130558543cbdf00",
            "name": "橘 愛日梨",
            "imgUrl": "https://yt3.ggpht.com/gFfjA6gERXO-ibaDq5B5KTUovCNIvG_ZVt8-Dm6g_ZwIRKviauKkozoGW2WrMqlYAyfNgERQ_Q=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=KKKl8eY29us",
            "thumbnailUrl": "https://i.ytimg.com/vi/KKKl8eY29us/mqdefault_live.jpg",
            "startTime": "2024-04-02T13:30:00.0000000+00:00"
        },
        {
            "id": "4c3cae772e974f8fb8e04f4cc9c8cd8d",
            "name": "白白虹",
            "imgUrl": "https://yt3.ggpht.com/8PNbv_OJ4pFWFy6lkDiV_C0kRdT14qM-lx8Wc9kZJV2lNC6Bi2IqJjPLC50ArfSX70DiyR1Z4bg=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=dWAz5DmrIIA",
            "thumbnailUrl": "https://i.ytimg.com/vi/dWAz5DmrIIA/mqdefault.jpg",
            "startTime": "2024-04-02T14:00:00.0000000+00:00"
        },
        {
            "id": "0c3b5ae85d2940b8b73a92d72dc0d313",
            "name": "璐夢Rumu",
            "imgUrl": "https://yt3.ggpht.com/Tee-Q1PNJ83z6T7B1cLbzLUWByJlJmHrZen8qzVUNIu3kvpEoGmCCO2n7EX2OfZbc0fC_3f1=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=vPDPJkX9nWU",
            "thumbnailUrl": "https://i.ytimg.com/vi/vPDPJkX9nWU/mqdefault_live.jpg",
            "startTime": "2024-04-02T14:00:00.0000000+00:00"
        },
        {
            "id": "50433c34f368460c9cda947f292a62b4",
            "name": "猫宮あゆめ",
            "imgUrl": "https://yt3.ggpht.com/GNW0dO6b-Y9MF5ugYhQv0rwi5jsS94jOi1xOV2cLvqR7XpfU0tRUREA0-njt265-fwuCSzPY=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=ZXz-Lle2AQ4",
            "thumbnailUrl": "https://i.ytimg.com/vi/ZXz-Lle2AQ4/mqdefault_live.jpg",
            "startTime": "2024-04-02T14:00:00.0000000+00:00"
        },
        {
            "id": "a168211aa3dd451cb33e09b80df0ea0a",
            "name": "神崎アルファ",
            "imgUrl": "https://yt3.ggpht.com/WaNt6XUwitRuvDjd4WIhvQchDnW_qUFTGKR0CPlGW8W6Nj_xBsWAKKF5XPDCjqyEuR8riJECeQ=s88-c-k-c0x00ffffff-no-rj",
            "videoUrl": "https://www.youtube.com/watch?v=38HBd0cth1w",
            "thumbnailUrl": "https://i.ytimg.com/vi/38HBd0cth1w/mqdefault_live.jpg",
            "startTime": "2024-04-02T14:00:00.0000000+00:00"
        }
    ]
    ;

const currentTime = dayjs();

// 使用 map() 方法遍历时间数组，找到大于当前时间且最接近当前时间的时间的索引
const closestIndex = timeArray.map((timeString, index) => {
    // 解析时间字符串为 Day.js 对象
    const time = dayjs(timeString);

    // 如果时间大于当前时间，则返回当前索引值
    if (time.isAfter(currentTime)) {
        return index;
    }

    // 否则返回数组的长度，确保它不会被认为是有效的索引
    return timeArray.length;
}).reduce((acc, index) => index < acc ? index : acc, timeArray.length); // 找到最小的有效索引值

// 如果找到最接近的时间的索引
if (closestIndex !== timeArray.length) {
    const prevIndex = closestIndex > 0 ? closestIndex - 1 : 0; // 前一个时间的索引
    const nextIndex = closestIndex < timeArray.length - 1 ? closestIndex + 1 : timeArray.length - 1; // 后一个时间的索引

    console.log("最接近的时间的索引:", closestIndex);
    console.log("前一个时间的索引:", prevIndex);
    console.log("后一个时间的索引:", nextIndex);

    // 取出对应的时间值
    const closestTime = dayjs(timeArray[closestIndex]);
    const prevTime = dayjs(timeArray[prevIndex]);
    const nextTime = dayjs(timeArray[nextIndex]);

    console.log("最接近的时间:", closestTime.format());
    console.log("前一个时间:", prevTime.format());
    console.log("后一个时间:", nextTime.format());
} else {
    console.log("找不到大于当前时间的时间。");
}

// const data = ref(1);
// const result = await useFetch('https://randomuser.me/api/');
// console.log(result);
// data.value = result.data.value;
// onMounted(() => {
//     console.log(data.value);
// }),

</script>

<template>
    <section class="w:full h:100vh flex flex:col jc:center ai:center">
        <p>test</p>
        <!-- <p>{{ result.data }}</p> -->
        <div>
            <button @click="getData">click</button>
        </div>
    </section>
</template>