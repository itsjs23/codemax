tinymce.init({
    selector: 'textarea', 
    height : 200,
    max_width: 750,
    plugins: "preview print fullscreen table image textcolor code",
    insert_toolbar: 'quickimage quicktable fontselect preview print fullscreen insertdatetime table image imagetools forecolor backcolor',
    textcolor_cols: "5",
    content_css : "assets/css/vendor/tiny.css",
    theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
    font_size_style_values : "10px,12px,13px,14px,16px,18px,20px",
});