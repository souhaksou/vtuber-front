<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { Modal, closeModal, pushModal, onBeforeModalClose } from 'jenesius-vue-modal';

import textMsg from '@/components/modal/textMsg.vue';

const props = defineProps({
    type: String,
    item: Object,
    categories: Object,
    tags: Object,
    slugs: Object
});

const emit = defineEmits();

const close = () => {
    closeModal();
};

onBeforeModalClose((event) => {
    if (event.background) return false;
});

const TAGS = ref({});
props.tags.forEach(element => {
    TAGS.value[element.name] = element._id;
});

// emit
const title = ref('');
const description = ref('');
const subcategoryId = ref('');
const tags = ref([]);
const slug = ref('');
const imgUrl = ref('');
const blockquote = ref('');
const text = ref('');
const highlight = ref(false);
const finished = ref(false);

const category = ref(null);
const subcategory = ref(null);
watch(category, (newValue, oldValue) => {
    subcategory.value = category.value.subcategories;
    subcategoryId.value = '';
});
const tagAdd = ref('');
const tagObj = ref({});
const addTag = (key) => {
    if (key.length === 0) {
        return;
    }
    const check = tagObj.value.hasOwnProperty(key);
    if (check === false) {
        tagObj.value[key] = TAGS.value[key];
    }
};

const deleteTag = (key) => {
    delete tagObj.value[key];
};

onMounted(() => {
    if (props.type === 'edit') {
        const temp = props.item;
        title.value = temp.title;
        description.value = temp.description;
        slug.value = temp.slug;
        imgUrl.value = temp.imgUrl;
        blockquote.value = temp.blockquote;
        text.value = temp.text;
        highlight.value = temp.highlight;
        finished.value = temp.finished;
        category.value = props.categories.find(e => {
            return e._id === temp.subcategoryId.categoryId._id;
        });
        setTimeout(() => {
            subcategoryId.value = temp.subcategoryId._id;
        }, 10);
        temp.tags.forEach(e => {
            tagObj.value[e.name] = TAGS.value[e.name];
        });
    }
});

// 編輯器實例必須用 shallowRef
const editorRef = shallowRef();

// HTML的內容
const mode = 'default';
const toolbarConfig = {};
const editorConfig = { placeholder: '請輸入內容' };

// 銷毀編輯器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor) => {
    editorRef.value = editor; // 紀錄 editor 實例
};

const confirm = async () => {
    if (title.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入標題' });
        return;
    }
    if (subcategoryId.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入分類' });
        return;
    }
    if (slug.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入slug' });
        return;
    }
    if (text.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入內容' });
        return;
    }
    for (let key in tagObj.value) {
        tags.value.push(tagObj.value[key]);
    }
    const res = {
        isConfirmed: true,
        data: {
            title: title.value,
            description: description.value,
            subcategoryId: subcategoryId.value,
            tags: tags.value,
            slug: slug.value,
            imgUrl: imgUrl.value,
            blockquote: blockquote.value,
            text: text.value,
            highlight: highlight.value,
            finished: finished.value,
        }
    };
    if (props.type === 'edit') {
        // 檢查slug
        const checkSlug = props.slugs.some(item => item.slug === slug.value && item._id !== props.item._id);
        if (checkSlug === true) {
            await pushModal(textMsg, { msg: 'slug 已經存在' });
            return;
        }
        res.data._id = props.item._id;
    }
    emit(Modal.EVENT_PROMPT, res);
};

</script>

<template>
    <div class="bg:white p:16|20 r:8 w:full max-w:screen-lg h:full max-h:calc(100vh-32px)">
        <div class="flex jc:end mb:16">
            <button class="block" @click="close"><i class="bi bi-x-lg fg:black f:20"></i></button>
        </div>
        <p class="mb:8">標題</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="title">
        <p class="mb:8">描述</p>
        <textarea class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="description"></textarea>
        <div class="flex ai:center mb:16">
            <p>大分類</p>
            <div class="w:16"></div>
            <select class="p:4|16 r:4 b:1|solid|gray" v-model="category">
                <option value="" disabled>請選擇</option>
                <option :key="item.name" v-for="item in props.categories" :value="item">
                    {{ `${item.name}（${item.show}）` }}</option>
            </select>
            <div class="w:32"></div>
            <p>子分類</p>
            <div class="w:16"></div>
            <select class="p:4|16 r:4 b:1|solid|gray" v-model="subcategoryId">
                <option value="" disabled>請選擇</option>
                <option :key="item.name" v-for="item in subcategory" :value="item._id">
                    {{ `${item.name}（${item.show}）` }}</option>
            </select>
        </div>
        <div class="flex ai:center mb:8">
            <p>標籤</p>
            <div class="w:16"></div>
            <input type="text" list="tagList" class="block w:full max-w:100 p:4|8 r:4 b:1|solid|gray" v-model="tagAdd">
            <datalist id="tagList">
                <option value="" disabled>請選擇</option>
                <option :key="item.name" v-for="item in props.tags" :value="item.name"></option>
            </datalist>
            <div class="w:16"></div>
            <a @click="addTag(tagAdd)" class="inline-block f:14 px:4 r:4 fg:white bg:green "><i
                    class="bi bi-plus"></i></a>
        </div>
        <div class="mb:16 p:8 r:4 bg:secondary flex">
            <template v-for="(item, key) in tagObj" :key="key">
                <p class="inline-block p:4|8 r:4 bg:white m:8"><span class="fg:gray mr:8">{{ key }}</span>
                    <a @click="deleteTag(key)" class="inline-block f:14 px:4 r:4 fg:white bg:red"><i
                            class="bi bi-x"></i></a>
                </p>
            </template>
        </div>
        <p class="mb:8">slug</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="slug">
        <p class="mb:8">圖片網址</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="imgUrl">
        <p class="mb:8">引言</p>
        <textarea class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="blockquote"></textarea>
        <div class="flex ai:center mb:32">
            <p>置頂</p>
            <div class="w:16"></div>
            <div @click="highlight = !highlight"
                :class="`${highlight === true ? 'bg:link {left:20;bg:white;}>div' : 'bg:third {bg:gray-10;left:2;}>div'}`"
                class="cursor:pointer w:36 h:18 r:16 transition:400ms rel">
                <div class="w:14 h:14 r:50 abs top:2 transition:400ms"></div>
            </div>
            <div class="w:32"></div>
            <p>發布</p>
            <div class="w:16"></div>
            <div @click="finished = !finished"
                :class="`${finished === true ? 'bg:link {left:20;bg:white;}>div' : 'bg:third {bg:gray-10;left:2;}>div'}`"
                class="cursor:pointer w:36 h:18 r:16 transition:400ms rel">
                <div class="w:14 h:14 r:50 abs top:2 transition:400ms"></div>
            </div>
        </div>
        <ClientOnly>
            <div style="border: 1px solid #ccc">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 600px; overflow-y: hidden;" v-model="text" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" />
            </div>
        </ClientOnly>
        <div class="h:16"></div>
        <div class="flex jc:center ai:center">
            <a @click="confirm"
                class="inline-block p:4|8 r:4 fg:white bg:blue b:1|solid|blue transition:400ms {fg:blue;bg:transparent;}:hover">
                確定
            </a>
            <div class="w:16"></div>
            <a @click="close"
                class="inline-block p:4|8 r:4 fg:white bg:red b:1|solid|red transition:400ms {fg:red;bg:transparent;}:hover">
                取消
            </a>
        </div>
        <div class="h:32"></div>
    </div>
</template>