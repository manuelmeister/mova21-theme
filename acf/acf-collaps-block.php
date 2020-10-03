<?php

acf_add_local_field_group( array(
	'key'                   => 'group_5e16225f53617',
	'title'                 => 'Aufklapp-Element',
	'fields'                => array(
		array(
			'key'               => 'field_5e162266d1d46',
			'label'             => 'Überschrift',
			'name'              => 'ueberschrift',
			'type'              => 'text',
			'instructions'      => '',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '',
				'class' => '',
				'id'    => '',
			),
			'default_value'     => '',
			'placeholder'       => '',
			'prepend'           => '',
			'append'            => '',
			'maxlength'         => '',
		),
		array(
			'key'               => 'field_5e16227cd1d47',
			'label'             => 'Element',
			'name'              => 'fragen',
			'type'              => 'repeater',
			'instructions'      => '',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '',
				'class' => '',
				'id'    => '',
			),
			'collapsed'         => '',
			'min'               => 0,
			'max'               => 0,
			'layout'            => 'table',
			'button_label'      => 'Element hinzufügen',
			'sub_fields'        => array(
				array(
					'key'               => 'field_5e162291d1d48',
					'label'             => 'Titel',
					'name'              => 'frage',
					'type'              => 'text',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'placeholder'       => '',
					'prepend'           => '',
					'append'            => '',
					'maxlength'         => '',
				),
				array(
					'key'               => 'field_5e16229cd1d49',
					'label'             => 'Text',
					'name'              => 'antwort',
					'type'              => 'wysiwyg',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'tabs'              => 'all',
					'toolbar'           => 'full',
					'media_upload'      => 1,
					'delay'             => 0,
				),
			),
		),
	),
	'location'              => array(
		array(
			array(
				'param'    => 'post_type',
				'operator' => '==',
				'value'    => 'post',
			),
			array(
				'param'    => 'post_type',
				'operator' => '==',
				'value'    => 'page',
			),
		),
	),
	'menu_order'            => 0,
	'position'              => 'normal',
	'style'                 => 'default',
	'label_placement'       => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen'        => '',
	'active'                => true,
	'description'           => '',
) );