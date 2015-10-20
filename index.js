var assets = {
    assets: './book',
    css: ['contractbridge.css']
};

function hand_html (name, spades, hearts, diams, clubs) {
    return '<div class="hand"> \
        <div class="hand-bar"> \
            <div class="hand-name">' + name + '</div> \
        </div> \
        <div class="hand-suit"> \
            <span class="card card-suit card-spade"></span> \
            <span class="card card-number">' + spades + '</span> \
        </div> \
        <div class="hand-suit"> \
            <span class="card card-suit card-heart"></span> \
            <span class="card card-number">' + hearts + '</span> \
        </div> \
        <div class="hand-suit"> \
            <span class="card card-suit card-diamond"></span> \
            <span class="card card-number">' + diams + '</span> \
        </div> \
        <div class="hand-suit"> \
            <span class="card card-suit card-club"></span> \
            <span class="card card-number">' + clubs + '</span> \
        </div> \
    </div>';
};

function bidding_html (bids) {
    return '<div class="bidding"> \
        <div class="bidding-head">'
            + ["W", "N", "E", "S"].map(function (bid) {
                return '<div class="bidding-cell">'+bid+'</div>';
            }).reduce(function (x, y) {
                return x + y;
            }) +
        '</div> \
        <div class="bidding-body"> \
            <div class="bidding-cell"></div>'
            + bids.map(function (bid) {
                return '<div class="bidding-cell">'+bid+'</div>';
            }).reduce(function (x, y) {
                return x + y;
            }) +
        '</div> \
    </div>';
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
                                bs_table.bids.push({
                                    auction: ary[0],
                                    auctiondef: ary[1]
                                });
                            }
                        });
                    }
                });

                return '<div class="biddingsystemTable"> \
                    <div class="seq"> \
                        <h4>' + bs_table.seq + '</h4> \
                    </div> \
                    <div class="bids">' 
                        + bs_table.bids.map(function(bid) {
                            return '<div class="bid"> \
                                <div class="auction">' + bid.auction + '</div> \
                                <div class="auctiondef">' + bid.auctiondef + '</div> \
                            </div>';
                        }).reduce(function(x, y) {
                            return x + y;
                        }) 
                    + '</div>\
                </div>';
            }
        },

        // suit: {
        //     shortcuts: {
        //         parsers: ["markdown", "asciidoc"],
        //         start: "$$",
        //         end: "$$"
        //     },
        //     process: function (blk) {
        //         switch(blk.body) {
        //             case "S":
        //                 return "&spades;";
        //                 break;
        //             case "H":
        //                 return "&hearts;";
        //                 break;
        //             case "D":
        //                 return "&diams;";
        //                 break;
        //             case "C":
        //                 return "&clubs;";
        //                 break;
        //             default:
        //                 return blk.body;
        //                 break;
        //         }
        //     }
        // },

        handBox: {
            process: function (blk){
                var name = blk.kwargs.name || "";
                var spades = blk.kwargs.spades || "";
                var hearts = blk.kwargs.hearts || "";
                var diams = blk.kwargs.diams || "";
                var clubs = blk.kwargs.clubs || "";
                return hand_html(name, spades, hearts, diams, clubs);
            }
        },
        biddingBox: {},
        biddingQuiz: {
            process: function (blk) {
                var name = blk.kwargs.name || "";
                var spades = blk.kwargs.spades || "";
                var hearts = blk.kwargs.hearts || "";
                var diams = blk.kwargs.diams || "";
                var clubs = blk.kwargs.clubs || "";
                var bids = blk.kwargs.bids || "";
                var answer = blk.kwargs.answer || "";
                return '<div class="biddingQuiz"> \
                    <div class="biddingQuiz-block">'+ hand_html(name, spades, hearts, diams, clubs) + '</div> \
                    <div class="biddingQuiz-block">' + bidding_html(bids) +'</div> \
                    <div class="biddingQuiz-block">Answer: ' + answer + '</div> \
                </div>';
            }
        }
    },

    // filters: {},
    // hooks: {}
};