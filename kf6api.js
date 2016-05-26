var kf6 = {
    token: null,
    baseURL: null,
    communityId: null,
    setBaseURL: function(baseURL) {
        this.baseURL = baseURL;
    },
    setCommunity: function(communityId) {
        this.communityId = communityId;
    },
    login: function(uname, password, success, failure) {
        var self = this;
        this.connect('POST', 'auth/local/', {
            userName: uname,
            password: password
        }, function(data) {
            self.token = data.token;
            if (success) {
                success();
            }
        }, failure);
    },
    getCommunities: function(success, failure) {
        this.connect('GET', 'api/users/myRegistrations', {}, success, failure);
    },
    getCommunity: function(success, failure) {
        this.connect('GET', 'api/communities/' + this.communityId, null, success, failure);
    },
    getMe: function(success, failure) {
        this.connect('GET', 'api/users/me', null, success, failure);
    },
    getMeAsAuthor: function(success, failure) {
        this.connect('GET', 'api/authors/' + this.communityId + '/me', null, success, failure);
    },
    getViews: function(success, failure) {
        this.connect('GET', 'api/communities/' + this.communityId + '/views',
            null, success, failure);
    },
    getAuthors: function(success, failure) {
        this.connect('GET', 'api/communities/' + this.communityId + '/authors',
            null, success, failure);
    },
    getGroups: function(success, failure) {
        this.connect('GET', 'api/communities/' + this.communityId + '/groups',
            null, success, failure);
    },
    getObjectsCount: function(query, success, failure) {
        this.connect('POST', 'api/contributions/' + this.communityId + '/search/count', {
            query: query
        }, success, failure);
    },
    getObjects: function(query, success, failure) {
        this.connect('POST', 'api/contributions/' + this.communityId + '/search', {
            query: query
        }, success, failure);
    },
    getRecords: function(query, success, failure) {
        this.connect('POST', 'api/records/search/' + this.communityId, {
            query: query
        }, success, failure);
    },
    getLinksFrom: function(fromId, success, failure) {
        this.connect('GET', 'api/links/from/' + fromId, null, success, failure);
    },
    connect: function(method, path, data, success, failure) {
        var url = this.getURL(path);
        var req = {
            url: url,
            type: method,
            headers: {
                'authorization': 'Bearer ' + this.token
            }
        };
        if (data) {
            req.contentType = 'application/json';
            req.dataType = 'json';
            req.data = JSON.stringify(data);
        }
        req.cache = false;
        $.ajax(req)
            .done(success)
            .fail(failure);
    },
    getURL: function(path) {
        if (!this.baseURL) {
            throw 'error';
        }
        return this.baseURL + path;
    },
}