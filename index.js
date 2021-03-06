'use strict';


module.exports = {
  book: {
    assets: './book',
    css: ['contractbridge.css'],
    js: ['auto-link.js'],
  },
  ebook: {
    assets: './book',
    css: ['contractbridge-ebook.css'],
  },

  blocks: {
    bids: {
      process(blk) {
        const output = [];
        const bids = blk.body.split('\n');
        bids.forEach((item) => {
          if (item) {
            const index = item.indexOf(':=');
            if (index !== -1) {
              let bid = item.substring(0, index).trim();
              const biddef = item.substring(index + 2).trim();
              if (bid.indexOf('>>') === 0) {
                bid = bid.substring(2).trim();
                output.push(`<div class="bids-row">
                              <div class="bids-bid bids-bid-right">${bid}</div>
                              <div class="bids-biddef">${biddef}</div>
                            </div>`);
              } else if (bid.length > 10) {
                output.push(`<div class="bids-row">
                              <div class="bids-bid-long">${bid}</div>
                              <div class="bids-biddef-long">${biddef}</div>
                            </div>`);
              } else {
                output.push(`<div class="bids-row">
                              <div class="bids-bid">${bid}</div>
                              <div class="bids-biddef">${biddef}</div>
                            </div>`);
              }
            } else {
              output.push(`<div class="bids-title">${item}</div>`);
            }
          }
        });
        return `<div class="bids">${output.join('\n')}</div>`;
      },
    },
  },

  // filters: {},
  hooks: {
    page(page) {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      page.content = page.content
        .replace(/!N/g, '<span class="word-suit word-suit-notrump">N</span>')
        .replace(/!S/g, '<span class="word-suit word-suit-spades">♠</span>')
        .replace(/!H/g, '<span class="word-suit word-suit-hearts">♥</span>')
        .replace(/!D/g, '<span class="word-suit word-suit-diams">♦</span>')
        .replace(/!C/g, '<span class="word-suit word-suit-clubs">♣</span>');
      return page;
    },
  },
};
