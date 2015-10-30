require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        $('.summary [data-path] a[href]')
            .each(function(){
                title = $(this).html().replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/ig, "").trim();
                link = $(this).attr('href');

                $( ".bids , p:contains("+title+")" ).each(function( index ) {
                    $(this).html($(this).html().replace(title, '<a href=\"'+link+'\">'+title+'</a>'));
                });
        });
    });
});


