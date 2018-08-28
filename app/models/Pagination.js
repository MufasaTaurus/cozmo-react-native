export default class Pagination {
    constructor(pagination) {
        this.itemsPerPage = 20;
        this.currentPage = pagination.currentPage || 1;
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getCount() {
        return this.count;
    }

    getDisplayFrom() {
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }

    getDisplayTo() {
        const items = this.currentPage * this.itemsPerPage;
        return items > this.count ? this.count : items;
    }

    nextPage() {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
        }
        return this.currentPage;
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        return this.currentPage;
    }

    canGoNext() {
        return this.currentPage + 1 <= this.getTotalPages();
    }

    setPage(page) {
        if (page > 0 && page <= this.getTotalPages()) {
            this.currentPage = page;
        }

        return this;
    }

    setCount(count) {
        this.count = count;

        return this;
    }

    getTotalPages() {
        return Math.ceil(this.count / this.itemsPerPage);
    }
}
