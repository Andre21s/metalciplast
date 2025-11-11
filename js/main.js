(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
            // Muestra el contenido de la página con un "fade-in".
            $('#page-content').css({ 'opacity': 1, 'visibility': 'visible' });
        }, 500);
    };
    
    $(window).on('load', function() {
        spinner(); // Llama a tu función SÓLO cuando todo ha cargado.
    });


    // Initiate the wowjs
    new WOW({
        offset: 50,
    }).init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 750, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    let $videoSrc;

    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });

    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', '');
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });


    function ajustarAlturaGaleria() {
        const galeria = document.getElementById("galleryContainer");
        const texto = document.getElementById("textContainer");

        // Verifica que ambos elementos existan
        if (!galeria || !texto) return;

        let altoTexto = texto.offsetHeight;

        // Si el ancho de la pantalla es menor a 450px, reduce el alto a la mitad
        if (window.innerWidth <= 450) {
            altoTexto = altoTexto / 2;
        }

        galeria.style.height = altoTexto + "px";
    }

    window.addEventListener("load", ajustarAlturaGaleria);
    window.addEventListener("resize", ajustarAlturaGaleria);


})(jQuery);

