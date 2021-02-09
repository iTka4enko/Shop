<template>
    <div class="error-alert">
        <div class="error-alert__inner">
            {{errorText}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        errorText: String
    }
}
</script>

<style lang="scss">
    @import '../../node_modules/animate.css/animate.min.css';
    @import '../assets/colors.scss';

    .error-alert{
        width: 100vw;
        height: 100vh;

        background-color: darken($primary-opacity, 70%);

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;

        transition: all .4s;

        z-index: 1;

        &__inner{
            background-color: lighten($error, 15%);
            border: 1px solid $error;

            padding: 40px;

            animation: zoomIn .2s;
        }
    }
</style>