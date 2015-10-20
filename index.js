var assets = {
    assets: './book',
    css: ['contractbridge.css']
};

function hand_html (player, spades, hearts, diams, clubs) {
    return '<div class="hand"> \
        <div class="hand-bar"> \
            <div class="hand-player"><b>' + player + '</b></div> \
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
                return '<div class="bidding-cell"><b>'+bid+'</b></div>';
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

        handBox: {
            process: function (blk){
                var player = blk.kwargs.player || "";
                var spades = blk.kwargs.spades || "";
                var hearts = blk.kwargs.hearts || "";
                var diams = blk.kwargs.diams || "";
                var clubs = blk.kwargs.clubs || "";
                return hand_html(player, spades, hearts, diams, clubs);
            }
        },
        biddingBox: {},
        biddingQuiz: {
            process: function (blk) {
                var player = blk.kwargs.player || "";
                var spades = blk.kwargs.spades || "";
                var hearts = blk.kwargs.hearts || "";
                var diams = blk.kwargs.diams || "";
                var clubs = blk.kwargs.clubs || "";
                var bids = blk.kwargs.bids || "";
                var answer = blk.kwargs.answer || "";
                var answer_detail = blk.kwargs.answer_detail || "";
                return '<div class="biddingQuiz"> \
                    <div class="biddingQuiz-block">'+ hand_html(player, spades, hearts, diams, clubs) + '</div> \
                    <div class="biddingQuiz-block">' + bidding_html(bids) +'</div> \
                    <div class="biddingQuiz-block"> \
                        Answer: ' + answer + 
                        '<br>'
                        + answer_detail +
                    '</div> \
                </div>';
            }
        }
    },

    // filters: {},
    hooks: {
        "page": function (page) {
            var content = page.sections[0].content;
            content = content
                        .replace(/!S/g, '<span class="card-spade"></span>')
                        .replace(/!H/g, '<span class="card-heart"></span>')
                        .replace(/!D/g, '<span class="card-diamond"></span>')
                        .replace(/!C/g, '<span class="card-club"></span>');
            page.sections[0].content = content;
            return page;
        }
    }
};