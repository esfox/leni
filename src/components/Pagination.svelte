<script lang="ts">
  import classNames from 'classnames';
  import { PaginationNav } from 'svelte-paginate';
  import Button from './Button.svelte';

  let className = '';
  export { className as class };

  export let currentPage = 1;
  export let totalItems = 1;
  export let itemsPerPage = 0;

  export let onChangePage: (page: number) => void = () => {};

  const changePage = ({ detail }) => {
    const { page } = detail;
    const lastPage = Math.ceil(totalItems / itemsPerPage);
    if ((page === 1 && currentPage === 1) || (page === lastPage && currentPage === lastPage))
      return;

    onChangePage(detail.page);
  };
</script>

<div class={classNames('pagination', className)}>
  <PaginationNav
    {currentPage}
    {totalItems}
    pageSize={itemsPerPage}
    limit={1}
    showStepOptions={true}
    let:value={pageNumber}
    on:setPage={changePage}
  >
    <Button
      slot="number"
      width="36px"
      height="36px"
      class="rounded-full mx-1"
      variant="primary"
      text={pageNumber !== currentPage}
      noPadding
    >
      {pageNumber}
    </Button>
    <Button slot="prev" width="36px" height="36px" class="rounded-full mx-1" text noPadding>
      <i class="fa-solid fa-chevron-left" />
    </Button>
    <Button slot="next" width="36px" height="36px" class="rounded-full mx-1" text noPadding>
      <i class="fa-solid fa-chevron-right" />
    </Button>
    <Button slot="ellipsis" width="36px" height="36px" class="rounded-full mx-1" text noPadding>
      ...
    </Button>
  </PaginationNav>
</div>

<style>
  .pagination :global(.pagination-nav) {
    display: flex;
    align-items: center;
  }
</style>
