const nodes = document.querySelectorAll('.brain-node');

nodes.forEach((node, index) => {

    node.style.animationDelay = `${index * 0.2}s`;

    node.addEventListener('mousemove', (e) => {

        const rect = node.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        node.style.background = `radial-gradient(circle at ${x}px ${y}px,
        rgba(91,140,255,0.28),
        rgba(10,15,25,0.95))`;

    });

    node.addEventListener('mouseleave', () => {

        node.style.background = 'rgba(10,15,25,0.92)';

    });

});
