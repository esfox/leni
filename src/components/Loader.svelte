<script lang="ts">
  import classNames from 'classnames';

  import { cssVariables } from 'src/actions/cssVariables';

  export let width = '4rem';
  export let height = '4rem';
  export let thickness = '4px';
  export let color = 'black';
  export let duration = '2s';

  let className: string = '';
  export { className as class };

  const variables = {
    width,
    height,
    thickness,
    color,
    duration
  };
</script>

<div class={classNames('loader', className)} use:cssVariables={variables}>
  <svg class="circular" viewBox="25 25 50 50">
    <circle
      class="path"
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke-width="2"
      stroke-miterlimit="10"
    />
  </svg>
</div>

<style lang="scss">
  .loader {
    position: relative;
    width: var(--width);
    height: var(--height);

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }

  .circular {
    animation: rotate var(--duration) linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .path {
    stroke: var(--color);
    stroke-width: var(--thickness);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
</style>
