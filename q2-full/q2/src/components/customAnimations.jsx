const customAnimations = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}
@keyframes fadeInError {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInError {
    animation: fadeInError 0.3s ease-out;
}
@keyframes fadeInNoResults {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInNoResults {
    animation: fadeInNoResults 0.3s ease-out;
}
`;

export default customAnimations