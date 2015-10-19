var assets = {
    assets: './book',
    css: ['contractbridge.css']
};

module.exports = {
    book: assets,
    ebook: assets,

    blocks: {
        biddingSystemTable: {
            blocks: ['seq', 'bids'],
            process: function(blk) {
                var bs_table = {
                    seq: "",
                    bids: []
                };
                blk.blocks.forEach(function(item) {
                    if (item.body && item.name == 'seq') {
                        bs_table.seq = item.body;
                    } else if (item.body && item.name == 'bids') {
                        item.body.split('\n').forEach(function(it) {
                            if (it) {
                                ary = it.split("##");
                                bs_table.bids.push({auction: ary[0], auctiondef: ary[1]});
                            }
                        });
                    }
                });
                return '<div class="biddingsystemTable">'
                        + '<div class="seq"><h4>' + bs_table.seq + '</h4></div>'
                        + '<div class="bids">' + bs_table.bids.map(function (bid) {
                            return '<div class="bid"><div class="auction">' + bid.auction + '</div>'
                                + '<div class="auctiondef">' + bid.auctiondef + '</div></div>';
                        }).reduce(function (x,y) { return x+y; }) + '</div>'
                    + '</div>';
            }
        },

        handBox:{
        },

        auctionBox:{
        },

        quizzBox:{
        }
    },

    // filters: {},
    // hooks: {}
};