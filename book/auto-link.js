require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        $('ul.summary [data-path] a[href]')
            .each(function(){
                title = $(this).html().replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/ig, "").trim();
                link = $(this).attr('href');

                $( "section .bids-biddef , section p:contains("+title+")" ).each(function( index ) {
                    text = $(this).html();
                    if (text.indexOf(title) != -1) {
                        re = new RegExp(title, 'gi');
                        $(this).html(text.replace(re, '<a href=\"'+link+'\">'+title+'</a>'));
                    }
                });
        });
    });
});


