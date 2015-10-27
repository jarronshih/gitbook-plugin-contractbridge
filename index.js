module.exports = {
    book: {
        assets: './book',
        css: ['contractbridge.css']
    },
    ebook: {
        assets: './book',
        css: ['contractbridge-ebook.css']
    },

    blocks: {
        bids: {
            process: function(blk) {
                output = [];
                bids = blk.body.split('\n');
                bids.forEach(function(item) {
                    if (item) {
                        index = item.indexOf(":=");
                        if (index != -1) {
                            bid = item.substring(0, index).trim();
                            biddef = item.substring(index + 2).trim();
                            if (bid.length >= 10) {
                                output.push('<div class="bids-row"><div class="bids-bid-long">' + bid + '</div><div class="bids-biddef-long">'+ biddef + '</div></div>');
                            } else {
                                output.push('<div class="bids-row"><div class="bids-bid">' + bid + '</div><div class="bids-biddef">'+ biddef + '</div></div>');
                            }
                        } else {
                            output.push('<div class="bids-title">' + item + '</div>');
                        }
                    }
                });
                return '<div class="bids">' + output.join('\n')+ '</div>';
            }
        }
    },

    // filters: {},
    hooks: {
        "page": function (page) {
            var content = page.sections[0].content;
            content = content
                .replace(/!N/g, '<span class="word-suit word-suit-notrump"></span>')
                .replace(/!S/g, '<span class="word-suit word-suit-spades"></span>')
                .replace(/!H/g, '<span class="word-suit word-suit-hearts"></span>')
                .replace(/!D/g, '<span class="word-suit word-suit-diams"></span>')
                .replace(/!C/g, '<span class="word-suit word-suit-clubs"></span>');
            page.sections[0].content = content;
            return page;
        }
    }
};