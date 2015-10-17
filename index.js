
module.exports = {
    blocks: {
        // Author will be able to write "{% myTag %}World{% endMyTag %}"
        myTag: {
            process: function(blk) {
                return "Hello "+blk.body;
            }
        }
    },
};

