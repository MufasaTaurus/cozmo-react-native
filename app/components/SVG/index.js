import React from 'react';
import search from 'assets/svg/search';
import wrench from 'assets/svg/wrench';
import code from 'assets/svg/code';
import star from 'assets/svg/star';
import backArrow from 'assets/svg/back-arrow';
import phone from 'assets/svg/phone';
import sms from 'assets/svg/sms';
import email from 'assets/svg/email';
import bed from 'assets/svg/bed';
import hottub from 'assets/svg/hottub';
import grid from 'assets/svg/grid';
import account from 'assets/svg/account';
import pet from 'assets/svg/pet';
import smoke from 'assets/svg/smoke';
import prom from 'assets/svg/prom';
import parking from 'assets/svg/parking';
import coffee from 'assets/svg/coffee';
import wheelchair from 'assets/svg/wheelchair';
import roomService from 'assets/svg/room-service';
import car from 'assets/svg/car';
import laundry from 'assets/svg/laundry';
import wifi from 'assets/svg/wifi';
import shuttle from 'assets/svg/shuttle';
import gym from 'assets/svg/gym';
import kitchen from 'assets/svg/kitchen';
import ac from 'assets/svg/ac';
import pool from 'assets/svg/pool';
import elevator from 'assets/svg/elevator';
import standby from 'assets/svg/standby';
import copy from 'assets/svg/copy';
import file from 'assets/svg/file';
import check from 'assets/svg/check';
import veryHappy from 'assets/svg/very-happy';
import happy from 'assets/svg/happy';
import neutral from 'assets/svg/neutral';
import sad from 'assets/svg/sad';
import verySad from 'assets/svg/very-sad';
import longTerm from 'assets/svg/long-term';
import event from 'assets/svg/event';
import text from 'assets/svg/text';
import attachment from 'assets/svg/attachment';
import bold from 'assets/svg/bold';
import italic from 'assets/svg/italic';
import underline from 'assets/svg/underline';
import alignLeft from 'assets/svg/align-left';
import alignRight from 'assets/svg/align-right';
import alignCenter from 'assets/svg/align-center';
import alignJustify from 'assets/svg/align-justify';
import bulletList from 'assets/svg/bullet-list';
import orderedList from 'assets/svg/ordered-list';
import link from 'assets/svg/link';
import fullscreen from 'assets/svg/fullscreen';
import cancel from 'assets/svg/cancel';
import goTo from 'assets/svg/go-to';
import goFrom from 'assets/svg/go-from';
import people from 'assets/svg/people';
import dates from 'assets/svg/dates';
import money from 'assets/svg/money';
import assignment from 'assets/svg/assignment';
import addCircle from 'assets/svg/add-circle';
import addBox from 'assets/svg/add-box';
import channel from 'assets/svg/channel';
import refresh from 'assets/svg/refresh';
import laptop from 'assets/svg/laptop';
import chart from 'assets/svg/chart';
import conversation from 'assets/svg/conversation';
import pieChart from 'assets/svg/pie-chart';
import security from 'assets/svg/security';
import creditCard from 'assets/svg/credit-card';
import download from 'assets/svg/download';
import pin from 'assets/svg/pin';
import inbox from 'assets/svg/inbox';
import del from 'assets/svg/delete';
import info from 'assets/svg/info';
import merge from 'assets/svg/merge';
import contact from 'assets/svg/contact';
import guests from 'assets/svg/guests';
import world from 'assets/svg/world';
import tv from 'assets/svg/tv';
import lock from 'assets/svg/lock';
import photo from 'assets/svg/photo';
import puzzle from 'assets/svg/puzzle';
import heart from 'assets/svg/heart';
import triangle from 'assets/svg/triangle';
import bookmark from 'assets/svg/bookmark';
import imageDrop from 'assets/svg/image-drop';
import fork from 'assets/svg/fork';
import moreVertical from 'assets/svg/more-vertical';
import alarm from 'assets/svg/alarm';
import sync from 'assets/svg/sync';
import houseEmpty from 'assets/svg/house-empty';
import pinWithHeart from 'assets/svg/pin-with-heart';
import restaurant from 'assets/svg/restaurant';
import sun from 'assets/svg/sun';
import kid from 'assets/svg/kid';
import museum from 'assets/svg/museum';
import wineGlass from 'assets/svg/wine-glass';
import moreHorizontal from 'assets/svg/more-horizontal';
import ticket from 'assets/svg/ticket';
import shopping from 'assets/svg/shopping';
import eye from 'assets/svg/eye';
import hamburger from 'assets/svg/hamburger';
import quilt from 'assets/svg/quilt';
import smileNew from 'assets/svg/smile-new';
import paint from 'assets/svg/paint';
import paperPlane from 'assets/svg/paper-plane';
import web from 'assets/svg/web';
import syncDisable from 'assets/svg/sync-disable';
import checkmark from 'assets/svg/checkmark';
import settingsBox from 'assets/svg/settings-box';
import error from 'assets/svg/error';
import illustration from 'assets/svg/illustration';
import contract from 'assets/svg/contract';
import deleteCircle from 'assets/svg/delete-circle';
import cached from 'assets/svg/cached';
import doneAll from 'assets/svg/done-all';
import bedAirplane from 'assets/svg/bed-airplane';
import done from 'assets/svg/done';
import cogs from 'assets/svg/cogs';
import groups from 'assets/svg/groups';
import autoEmail from 'assets/svg/auto-email';
import block from 'assets/svg/block';
import underConstruction from 'assets/svg/under-construction';
import moonFilled from 'assets/svg/moon-filled';
import sort from 'assets/svg/sort';
import warning from 'assets/svg/warning';
import clear from 'assets/svg/clear';
import cogwheel from 'assets/svg/cogwheel';
import medal from 'assets/svg/medal';
import clock from 'assets/svg/clock';
import help from 'assets/svg/help';
import eventChecked from 'assets/svg/event-checked';

export default function SVG({ icon, size = 24, className, onClick }) {
    const icons = {
        logoV:
            `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="` + size + `px" height="` + size + `px" viewBox="0 0 40 40"><g><path style="fill:#26BAA4;fill-opacity:0.7;" d="M27.2,24.7L27.2,24.7c-0.1-0.2-0.2-0.5-0.3-0.7l0,0l-0.1-0.1l0,0
		l0,0L24.7,20v0L23,16.9l-0.9-1.5l-1.7-3.1l-0.3-0.6L18,8l0,0l0,0l-0.1-0.2l0,0l0-0.1c-0.3-0.5-0.7-1-1.1-1.4
		C15.3,4.8,13.4,4,11.5,4h0C9.5,4,7.6,4.8,6.2,6.3C5.9,6.5,5.7,6.8,5.5,7.1c-0.3,0.5-0.6,1-0.9,1.5c-0.9,2.2-0.8,4.6,0.3,6.7
		l0.2,0.4l0,0.1l0,0l6.7,11.9l1.7,3.1l0.4,0.6l0,0v0l0,0l0.1,0.2l0,0l0,0c0.1,0.2,0.2,0.4,0.4,0.6v0c0.2,0.3,0.5,0.6,0.7,0.9
		c1.2,1.2,2.7,2,4.4,2.2v0c0.6,0.1,1.2,0.1,1.7,0l0,0v0c1.7-0.2,3.2-1,4.4-2.2c0.4-0.4,0.7-0.8,1-1.3l0.4-0.6l0,0l0,0
		C28,29.2,28.1,26.8,27.2,24.7"/></g><path style="fill:#5591CD;fill-opacity:0.7;" d="M26.5,32.4L26.5,32.4c0.2-0.2,0.3-0.4,0.4-0.6l0,0l0.1-0.1l0,0l0,0l2.1-3.7h0l1.7-3
    l0.9-1.5l1.7-3l0.3-0.6l2.1-3.6l0,0l0,0l0.1-0.2h0l0,0l0-0.1c1.2-2.3,1.2-5.1-0.1-7.4l0,0c-1-1.7-2.6-3-4.5-3.5
    c-0.4-0.1-0.7-0.2-1.1-0.2c-0.6-0.1-1.1-0.1-1.7,0c-2.3,0.3-4.3,1.6-5.4,3.5l-0.2,0.4l0,0.1v0l-6.7,11.8l-1.7,3L14.1,24l0,0l0,0l0,0
    L14,24.2l0,0l0,0c-0.1,0.2-0.2,0.4-0.3,0.6l0,0c-0.1,0.3-0.3,0.7-0.4,1.1c-0.4,1.6-0.3,3.4,0.3,4.9c0.2,0.5,0.5,1.1,0.9,1.5l0,0h0
    c1,1.4,2.4,2.3,4,2.8c0.5,0.1,1,0.2,1.6,0.2h0.7C23.1,35.3,25.1,34.2,26.5,32.4"/></svg>`,
        logoGoogle: `
        <svg xmlns="http://www.w3.org/2000/svg" width="` + size + `px" height="` + size + `px" viewBox="0 0 192 192">
    <path fill="#4285F4" d="M180.5 98c0-6.24-.53-12.25-1.54-18H96v34h47.37c-2.04 11-8.21 20.37-17.56 26.64v22.12h28.5c16.63-15.32 26.19-37.98 26.19-64.76z"/>
    <path fill="#34A853" d="M125.82 140.64C117.95 145.92 107.83 149 96 149c-22.9 0-42.33-15.45-49.27-36.27H17.36v22.79C31.84 164.28 61.61 184 96 184c23.75 0 43.75-7.8 58.32-21.24l-28.5-22.12z"/>
    <path fill="#FBBC05" d="M44 96c0-5.82.97-11.45 2.73-16.73v-22.8H17.36C11.38 68.36 8 81.78 8 96s3.38 27.64 9.36 39.53l29.37-22.79C44.97 107.45 44 101.82 44 96z"/>
    <path fill="#EA4335" d="M96 43c12.93 0 24.52 4.45 33.66 13.16l25.22-25.22C139.63 16.72 119.74 8 96 8 61.61 8 31.84 27.72 17.36 56.47l29.37 22.79C53.67 58.45 73.1 43 96 43z"/>
    </svg>
        `,
        face: `
        <svg fill="#585E61" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        </svg>`,
        city: `
        <svg fill="#585E61" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        </svg>`,
        town: `
        <svg fill="#585E61" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>`,
        newExclamation: `
        <svg fill="#000000" width="` + size + `px" height="` + size + `px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"/>
</svg>`,
        exclamation: `
        <svg  fill="#000000" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg"
	 viewBox="0 0 24 24"><path d="M14,14.2h-4v-12h4V14.2z M10,22.2v-4h4 M14,18.2v4h-4"/></svg>
        `,
        apps: `
        <svg fill="#000000" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        `,
        settings: `
        <svg fill="#000000" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </svg>
        `,
        play: `
        <svg fill="#000000" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        `,
        personAdd: `
        <svg fill="#000000" viewBox="0 0 24 24" width="` + size + `px" height="` + size + `px" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        `,
        importEdit: `
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="` + size + `px" height="` + size + `px" viewBox="0 0 24 24">
            <path fill="none" d="M3.6,5.8H24v20.4H3.6V5.8z"/>
            <path d="M20.4,14.5c-0.5-2.7-2.9-4.7-5.7-4.7c-2.3,0-4.2,1.3-5.2,3.2c-2.4,0.2-4.2,2.2-4.2,4.7
                c0,2.6,2.1,4.7,4.7,4.7h10.2c2.2,0,3.9-1.7,3.9-3.9C24,16.3,22.4,14.6,20.4,14.5z M18.5,16.8l-3.9,3.9l-3.9-3.9h2.3v-3.1h3.1v3.1
                H18.5z"/>
            <path d="M0,10.6v2.7h2.7l8.1-8.1L8.1,2.5L0,10.6z M13,3.1c0.3-0.3,0.3-0.7,0-1l-1.7-1.7c-0.3-0.3-0.7-0.3-1,0
                L8.9,1.7l2.7,2.7C11.6,4.5,13,3.1,13,3.1z"/>
            <path fill="none" d="M-1.4-1.5h18.3v18.3H-1.4V-1.5z"/>
        </svg>
        `,
        home: `
        <svg fill="#000000" height="${size}" viewBox="0 0 24 24" width="${size}" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        `,
        edit: `
        <svg fill="#000000" height="${size}" viewBox="0 0 24 24" width="${size}" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        `,
        import: `
        <svg fill="#000000" height="${size}" viewBox="0 0 24 24" width="${size}" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
        </svg>
        `,
        search: search(size),
        wrench: wrench(size),
        code: code(size),
        star: star(size),
        backArrow: backArrow(size),
        phone: phone(size),
        sms: sms(size),
        email: email(size),
        bed: bed(size),
        hottub: hottub(size),
        grid: grid(size),
        account: account(size),
        pet: pet(size),
        smoke: smoke(size),
        prom: prom(size),
        parking: parking(size),
        coffee: coffee(size),
        wheelchair: wheelchair(size),
        roomService: roomService(size),
        car: car(size),
        laundry: laundry(size),
        wifi: wifi(size),
        shuttle: shuttle(size),
        gym: gym(size),
        kitchen: kitchen(size),
        ac: ac(size),
        pool: pool(size),
        elevator: elevator(size),
        standby: standby(size),
        copy: copy(size),
        file: file(size),
        check: check(size),
        veryHappy: veryHappy(size),
        neutral: neutral(size),
        sad: sad(size),
        verySad: verySad(size),
        happy: happy(size),
        longTerm: longTerm(size),
        event: event(size),
        text: text(size),
        attachment: attachment(size),
        bold: bold(size),
        italic: italic(size),
        underline: underline(size),
        alignLeft: alignLeft(size),
        alignRight: alignRight(size),
        alignCenter: alignCenter(size),
        alignJustify: alignJustify(size),
        bulletList: bulletList(size),
        orderedList: orderedList(size),
        link: link(size),
        fullscreen: fullscreen(size),
        cancel: cancel(size),
        goTo: goTo(size),
        goFrom: goFrom(size),
        people: people(size),
        dates: dates(size),
        money: money(size),
        assignment: assignment(size),
        addCircle: addCircle(size),
        addBox: addBox(size),
        channel: channel(size),
        refresh: refresh(size),
        laptop: laptop(size),
        chart: chart(size),
        conversation: conversation(size),
        pieChart: pieChart(size),
        security: security(size),
        creditCard: creditCard(size),
        download: download(size),
        pin: pin(size),
        inbox: inbox(size),
        del: del(size),
        info: info(size),
        merge: merge(size),
        contact: contact(size),
        guests: guests(size),
        world: world(size),
        tv: tv(size),
        lock: lock(size),
        photo: photo(size),
        puzzle: puzzle(size),
        heart: heart(size),
        triangle: triangle(size),
        bookmark: bookmark(size),
        imageDrop: imageDrop(size),
        fork: fork(size),
        moreVertical: moreVertical(size),
        alarm: alarm(size),
        sync: sync(size),
        houseEmpty: houseEmpty(size),
        pinWithHeart: pinWithHeart(size),
        restaurant: restaurant(size),
        sun: sun(size),
        kid: kid(size),
        museum: museum(size),
        wineGlass: wineGlass(size),
        moreHorizontal: moreHorizontal(size),
        ticket: ticket(size),
        shopping: shopping(size),
        eye: eye(size),
        hamburger: hamburger(size),
        quilt: quilt(size),
        smileNew: smileNew(size),
        paint: paint(size),
        paperPlane: paperPlane(size),
        web: web(size),
        syncDisable: syncDisable(size),
        checkmark: checkmark(size),
        settingsBox: settingsBox(size),
        error: error(size),
        illustration: illustration(size),
        contract: contract(size),
        deleteCircle: deleteCircle(size),
        cached: cached(size),
        doneAll: doneAll(size),
        bedAirplane: bedAirplane(size),
        done: done(size),
        cogs: cogs(size),
        groups: groups(size),
        autoEmail: autoEmail(size),
        block: block(size),
        underConstruction: underConstruction(size),
        moonFilled: moonFilled(size),
        sort: sort(size),
        warning: warning(size),
        clear: clear(size),
        cogwheel: cogwheel(size),
        medal: medal(size),
        clock: clock(size),
        help: help(size),
        eventChecked: eventChecked(size),
    };

    return (
        <span className={ className } onClick={ onClick } dangerouslySetInnerHTML={{ __html: icons[icon] }} />
    );
}
