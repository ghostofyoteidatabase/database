
document.addEventListener("DOMContentLoaded", () => {

    // PARALLAX EFFECT
    document.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        document.querySelectorAll(".weapon-node").forEach(node => {

            node.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    });

    // NODE GLOW EFFECT
    const tags = document.querySelectorAll(".tag");

    tags.forEach(tag => {

        tag.addEventListener("mouseenter", () => {

            tag.style.boxShadow =
                "0 0 20px rgba(91,140,255,0.8), 0 0 50px rgba(91,140,255,0.3)";

        });

        tag.addEventListener("mouseleave", () => {

            tag.style.boxShadow = "none";

        });

    });

    // FLOATING WEAPON NODES
    const nodes = document.querySelectorAll(".weapon-node");

    nodes.forEach((node, index) => {

        let direction = 1;

        setInterval(() => {

            const amount = direction * 6;

            node.animate(
                [
                    {
                        transform: `translateY(0px)`
                    },
                    {
                        transform: `translateY(${amount}px)`
                    }
                ],
                {
                    duration: 2500 + (index * 300),
                    iterations: 1,
                    fill: "forwards",
                    easing: "ease-in-out"
                }
            );

            direction *= -1;

        }, 2500 + (index * 300));

    });

    // SCROLL REVEAL
    const revealNodes = () => {

        const triggerBottom =
            window.innerHeight * 0.85;

        nodes.forEach(node => {

            const top =
                node.getBoundingClientRect().top;

            if (top < triggerBottom) {

                node.style.opacity = "1";
                node.style.transform = "translateY(0px)";

            }

        });

    };

    nodes.forEach(node => {

        node.style.opacity = "0";
        node.style.transform = "translateY(40px)";
        node.style.transition =
            "all 0.8s ease";

    });

    window.addEventListener("scroll", revealNodes);

    revealNodes();

});
