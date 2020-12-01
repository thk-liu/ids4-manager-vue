<template>
    <a-input-group class="input-group" compact>
        <button class="input-btn" :disabled="deleteDisabled" @click="handleDelete">-</button>
        <a-input-number
            class="input-number"
            v-model="value"
            :defaultValue="defaultValue"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
        />
        <button class="input-btn" @click="handleAdd">+</button>
    </a-input-group>
</template>

<script>
export default {
    name: "InputNumber",
    props: ['defaultValue'],
    data () {
        return {
            value: !this.defaultValue ? 0 : this.defaultValue 
        }
    },
    computed: {
        deleteDisabled () {
            return this.value === 0 ? true : false
        }
    },
    methods: {
        handleDelete() {
            this.value--
            this.$emit('delete', this.value)
        },
        handleAdd () {
            this.value++
            this.$emit('add', this.value)
        },
        handleChange (value) {
            this.$emit('change', value)
        },
        handleFocus () {
            this.$emit('focus', this.value)
        },
        handleBlur () {
            this.$emit('blur', this.value)
        }
    }
}
</script>

<style lang="less" scoped>
.input-group{
    width: 130px;
    .input-btn{
        width: 20%;
        padding: 4px 0;
        border: 1px solid #d9d9d9;
        height: 32px;
        background-color: #fff;
    }
    .input-number{
        width: 60%;
        text-align: center;
        /deep/.ant-input-number-handler-wrap{
            display: none;
        }
    }
}
</style>