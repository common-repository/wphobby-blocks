const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
	URLInput,
	InspectorControls,
	mediaUpload,
    BlockAlignmentToolbar,
    BlockIcon,
    InspectorAdvancedControls,
    MediaReplaceFlow,
	RichText
	} = wp.blockEditor || wp.editor;

const { getBlobByURL, isBlobURL, revokeBlobURL } = wp.blob;

const attributes = {
    imgUrl: {
        type: 'string',
        default: 'http://placehold.it/500'
    }
};

export const ALLOWED_MEDIA_TYPES = [ 'image' ];

registerBlockType("wphobby-gutenberg/wphobby-image", {
    title: __('WPHobby: Image', 'wphobby-gutenberg'),
    icon: 'smiley',
    category: "layout",
    keywords: [__("Image Slider"), __("Slideshow"), __("WPHobby Image")],
    attributes,

    edit(props) {
        const { className, setAttributes } = props;
        const { attributes } = props;
        const labels = {
            title: __( 'Image' ),
            instructions: __(
                'Upload an image file, pick one from your media library, or add one with a URL.'
            ),
        };
        const {
            url,
            id,
            imgUrl,
            } = attributes;
        const mediaPreview = (
                <img
                    alt={ __( 'Edit image' ) }
                    title={ __( 'Edit image' ) }
                    className={ 'edit-image-preview' }
                    src={ imgUrl }
                />
            );
        function selectImage(value) {
            console.log(value.url);
            setAttributes({
               imgUrl: value.url,
            })
        }

        return [
            <InspectorControls>
                {/* Later, when we have customizable options we will add stuff here! */}
                <div
                    style={{
                        padding: '1em 0',
                    }}
                >
                    Options
                </div>
            </InspectorControls>,
            <div className={className}>
                <div className="media">
                    <MediaPlaceholder
                        labels={ labels }
                        onSelect={selectImage}
                        accept="image/*"
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        value={ imgUrl }
                        mediaPreview={ mediaPreview }
                        disableMediaButtons={ url }
                    />
                </div>
            </div>,
        ];
    },

    save: () => null
});
