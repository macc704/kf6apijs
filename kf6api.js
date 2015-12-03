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
            email: uname,
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
    getObjects: function(query, success, failure) {
        this.connect('POST', 'api/contributions/' + this.communityId + '/search', {
            query: query
        }, success, failure);
    },
    connect: function(method, path, data, success, failure) {
        var url = this.getURL(path);
        $.ajax({
                url: url,
                type: method,
                headers: {
                    'authorization': 'Bearer ' + this.token
                },
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data)
            })
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