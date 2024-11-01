const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	ColorPalette,
	AlignmentToolbar,BlockControls
	} = wp.blockEditor || wp.editor;
const { IconButton, Dropdown, PanelBody, RangeControl, SelectControl } = wp.components;
const { withState, compose } = wp.compose;
const { withSelect } = wp.data;

registerBlockType("wphobby-gutenberg/wphobby-list", {
	title: __( 'WPHobby: List', 'wphobby-gutenberg' ),
	icon: 'universal-access-alt',
	category: 'layout',
	attributes: {
		blockID: {
			type: "string",
			default: ""
		},
		list: {
			type: "text",
			default: [...Array(3).keys()]
				.map(i => `<li>${__(`Item ${i + 1}`)}</li>`)
				.join()
		},
		//retained for reverse compatibility
		listItem: {
			type: "array",
			default: Array(3).fill({
				text: "",
				selectedIcon: "check",
				indent: 0
			})
		},
		selectedIcon: {
			type: "string",
			default: "check"
		},
		iconColor: {
			type: "string",
			default: "#000000"
		},
		iconRound: {
			type: "string",
			default: "0"
		}
	},
	keywords: [__("List"), __("Styled List"), __("WPHobby Blocks")],
	edit: compose([
		withState({
			availableIcons: [],
			iconSearchTerm: "",
			recentSelection: "",
			edits: 0
		}),
		withSelect((select, ownProps) => ({
			block: (select("core/block-editor") || select("core/editor")).getBlock(
				ownProps.clientId
			)
		}))
	])(function(props) {
		const {
			block,
			isSelected,
			attributes,
			setAttributes,
			setState,
			availableIcons,
			iconSearchTerm,
			edits
			} = props;
		const {
			list,
			listItem,
			iconColor,
			iconRound,
			selectedIcon,
			blockID
			} = attributes;

		if (blockID !== block.clientId) {
			setAttributes({ blockID: block.clientId });
		}

		if (
			JSON.stringify(listItem) !==
			`[${Array(3)
				.fill('{"text":"","selectedIcon":"check","indent":0}')
				.join(",")}]`
		) {
			let newList = "";

			listItem.forEach((item, i) => {
				let insertionPoint = newList.length;

				for (let j = 0; j < item.indent; j++) {
					let ulPosition = newList.lastIndexOf("</ul>", insertionPoint - 1);
					if (ulPosition > -1 && newList.lastIndexOf("<li>") < ulPosition) {
						insertionPoint = ulPosition;
					} else {
						insertionPoint -= 5;
						break;
					}
				}

				let insertedItem =
					i === 0 || item.indent <= listItem[i - 1].indent
						? `<li>${item.text}</li>`
						: `<ul class="fa-ul"><li>${item.text}</li></ul>`;

				newList = [
					newList.slice(0, insertionPoint),
					insertedItem,
					newList.slice(insertionPoint)
				].join("");
			});

			setAttributes({
				selectedIcon: listItem[0].selectedIcon,
				list: newList,
				listItem: Array(3).fill({
					text: "",
					selectedIcon: "check",
					indent: 0
				})
			});
		}

		return [
			isSelected && (
				<InspectorControls>
					<PanelBody title={__("Icon Options")}>
						<p>{__("Icon color")}</p>
						<ColorPalette
							value={iconColor}
							onChange={colorValue => setAttributes({ iconColor: colorValue })}
							allowReset
						/>
						<p>{__("Button Style")}</p>
						<SelectControl
							value={iconRound}
							options={[
                            {
								label: __('Boxed', 'wphobby-blocks'),
								value: '0'
							},
							{
								label: __('Rounded', 'wphobby-blocks'),
								value: '99%'
							}
						]}
							onChange={pos => setAttributes({ iconRound: pos })}
						/>
					</PanelBody>
				</InspectorControls>
			),


			<div
				className="wphobby-styled-list"
				id={`wphobby-styled-list-${blockID}`}
			>
				<RichText
					className="fa-ul"
					multiline="li"
					tagName="ol"
					value={list}
					onChange={newList => {
						newList = newList.replace("<ul>", '<ul class="fa-ul">');
						setAttributes({ list: newList });
					}}
				/>

				<style
					dangerouslySetInnerHTML={{
						__html: `#wphobby-styled-list-${blockID} li:before{
                       background:${iconColor};
                       border-radius: ${iconRound};
                       }`
					}}
				/>
			</div>
		];
	}),

	save: () => null
});
