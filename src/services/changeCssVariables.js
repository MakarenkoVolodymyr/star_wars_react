
export const changeCssVariables = theme => {
    const root = document.querySelector(':root');


    const CssVariables = ['header', 'bgimage'];

    CssVariables.forEach(element => {
        root.style.setProperty(
            `--theme-default-${element}`,
             `var(--theme-${theme}-${element})`
        );
    });
};