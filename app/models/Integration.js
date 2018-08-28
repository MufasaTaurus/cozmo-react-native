export default class Integration {
    constructor(integration) {
        this.id = integration.get('id');
        this.type = integration.get('tags');
        this.name = integration.get('name');
        this.image = integration.get('image');
        this.description = integration.get('description');
        this.url = integration.get('install_url');
        this.installed = integration.get('installed');
        this.installUrl = integration.get('url');
    }

    getType() {
        return this.type.join(', ') ;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getImage() {
        return this.image;
    }

    getDescription() {
        return this.description;
    }

    getUrl() {
        return this.url;
    }

    isInstalled() {
        return this.installed;
    }

    getInstallUrl() {
        return this.installUrl;
    }

    setInstallUrl(url) {
        this.installUrl = url;
        return this;
    }

    filterIntegration(type = '', query = '') {
        return (
            query ? (
                this.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                this.description.toLowerCase().indexOf(query.toLowerCase()) > -1
            ) : (
                type === 'All' ||
                this.type.join('|').indexOf(type) > -1
            )
        );
    }
}
