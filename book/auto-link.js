require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        $('ul.summary [data-path] a[href]')
            .each(function(){
                title = $(this).html().replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/ig, "").trim();
                link = $(this).attr('href');

                $( "section .bids-biddef , section p" ).each(function( index ) {
                    re = new RegExp(title, 'gi');
                    text = $(this).html();
                    if (re.test(text)) {
                        $(this).html(text.replace(re, '<a href=\"'+link+'\">'+title+'</a>'));
                    }
                });
        });
    });
});


