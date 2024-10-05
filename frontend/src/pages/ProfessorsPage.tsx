import axios from "axios";
import React, { useState, useEffect } from "react";

const profData = {
    "Ethan Hunt": {
        Mon: {
            "1": {
                subject: "Visual Communication (VC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Social Media Marketing (SMM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "3": {
                subject: "Radio Program Production (RPP)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Tue: {
            "0": {
                subject: "Visual Communication (VC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "1": {
                subject: "Consumer Behaviour (CB)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "Radio Program Production (RPP)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Wed: {
            "0": {
                subject: "Social Media Marketing (SMM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "Film Communication-I (FLC)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "3": {
                subject: "Social Media Marketing (SMM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Thurs: {
            "0": {
                subject: "Film Communication-I (FLC)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "3": {
                subject: "Consumer Behaviour (CB)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Fri: {
            "0": {
                subject: "Computer Multi Media (C & M)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "1": {
                subject: "Visual Communication (VC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Computer Multi Media (C & M)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "3": {
                subject: "Social Media Marketing (SMM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Sat: {
            "0": {
                subject: "Visual Communication (VC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Consumer Behaviour (CB)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "3": {
                subject: "Consumer Behaviour (CB)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
    },
    "Rocky Balboa": {
        Mon: {
            "0": {
                subject: "IM / Risk Mgt / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Commerce-III (Com-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "Foundation Course-III",
                subtype: "Theory",
                department: "SY BAF",
            },
            "3": {
                subject: "Effective Communication Skill-I (ECS)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
        },
        Tue: {
            "0": {
                subject: "Commerce-III (Com-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "1": {
                subject: "IM / Risk Mgt / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "Effective Communication Skill-I (ECS)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "3": {
                subject: "Business Law-II",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
        Wed: {
            "0": {
                subject: "Risk Mgt / IM / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Current Affairs (CA)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Business Law-II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "3": {
                subject: "Current Affairs (CA)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
        },
        Thurs: {
            "0": {
                subject: "Effective Communication Skill-I (ECS)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "1": {
                subject: "Business Law-II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Current Affairs (CA)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "3": {
                subject: "Commerce-III (Com-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Fri: {
            "0": {
                subject: "IR / Risk Mgt / IM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Commerce-III (Com-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "Foundation Course-III",
                subtype: "Theory",
                department: "SY BAF",
            },
            "3": {
                subject: "Foundation Course-III",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
        Sat: {},
    },
    "Katniss Everdeen": {
        Mon: {
            "0": {
                subject: "AMD",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "Introduction to Financial Accounting (IFA)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Tue: {
            "1": {
                subject: "Introduction to Financial Accounting (IFA)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "3": {
                subject: "Introduction to Financial Management (IFM-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Wed: {
            "0": {
                subject: "Introduction to Financial Accounting (IFA)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "1": {
                subject: "AMD",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Introduction to Financial Management (IFM-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "3": {
                subject: "Cost Acounting",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Thurs: {
            "0": {
                subject: "AMD",
                subtype: "Theory",
                department: "SY BMS",
            },
            "1": {
                subject: "Introduction to Financial Management (IFM-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "2": {
                subject: "Cost Acounting",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Fri: {
            "0": {
                subject: "Introduction to Financial Management (IFM-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Sat: {
            "0": {
                subject: "AMD",
                subtype: "Theory",
                department: "SY BMS",
            },
            "1": {
                subject: "Cost Acounting",
                subtype: "Theory",
                department: "TY BAF",
            },
            "2": {
                subject: "Cost Acounting",
                subtype: "Theory",
                department: "TY BAF",
            },
            "3": {
                subject: "Introduction to Financial Accounting (IFA)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
    },
    "Forrest Gump": {
        Mon: {
            "0": {
                subject: "Auditing-II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "1": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Tue: {
            "0": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "1": {
                subject: "Auditing-II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Business Communication (BC)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Wed: {
            "1": {
                subject: "Business Communication (BC)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "2": {
                subject: "M&L / E&D / Advertising",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Thurs: {
            "0": {
                subject: "Business Communication (BC)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "1": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Auditing-II",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
        Fri: {
            "0": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Sat: {
            "0": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "1": {
                subject: "Auditing-II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
    },
    Neo: {
        Mon: {
            "0": {
                subject: "Business Law-I (B. Law-I)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "Envt. Mgt-III",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "Business Economics-II",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
        Tue: {
            "0": {
                subject: "Envt. Mgt-III",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Wed: {
            "1": {
                subject: "Business Economics-II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "3": {
                subject: "Business Law-I (B. Law-I)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Thurs: {
            "0": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "2": {
                subject: "Business Law-I (B. Law-I)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Fri: {
            "0": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "1": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "Envt. Mgt-III",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "Envt. Mgt-III",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Sat: {
            "0": {
                subject: "Business Law-I (B. Law-I)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "1": {
                subject: "Corporate Communication & Public Relation (CCPR)",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "Business Economics-II",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
    },
    "John McClane": {
        Mon: {
            "1": {
                subject: "Logistics & Supply Chain Mgt.",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Brand Building",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Tue: {
            "1": {
                subject: "SM",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Brand Building",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "3": {
                subject: "Business Communication-I (BC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Wed: {
            "0": {
                subject: "SM",
                subtype: "Theory",
                department: "SY BMS",
            },
            "1": {
                subject: "Brand Building",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "Logistics & Supply Chain Mgt.",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "SM",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Thurs: {
            "0": {
                subject: "Brand Building",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "1": {
                subject: "Logistics & Supply Chain Mgt.",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
        Fri: {
            "0": {
                subject: "Business Economics-III (B.Eco-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "1": {
                subject: "SM",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Logistics & Supply Chain Mgt.",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Business Communication-I (BC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Sat: {
            "0": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Business Communication-I (BC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Business Communication-I (BC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "3": {
                subject: "Business Economics-III (B.Eco-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
    },
    "Hermione Granger": {
        Mon: {
            "0": {
                subject: "IM / Risk Mgt / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Business Envt.-I (Commerce-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "2": {
                subject: "Environmental Studies-I (EVS-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Tue: {
            "0": {
                subject: "Business Envt.-I (Commerce-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "1": {
                subject: "IM / Risk Mgt / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Foundation Course-III (FC-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Wed: {
            "0": {
                subject: "Risk Mgt / IM / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Environmental Studies-I (EVS-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Foundation Course-III (FC-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Thurs: {
            "0": {
                subject: "Environmental Studies-I (EVS-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "1": {
                subject: "Foundation Course-III (FC-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "BPEM",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "BPEM",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Fri: {
            "0": {
                subject: "IR / Risk Mgt / IM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Business Envt.-I (Commerce-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Sat: {
            "0": {
                subject: "Environmental Studies-I (EVS-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "1": {
                subject: "BPEM",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Business Envt.-I (Commerce-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "3": {
                subject: "BPEM",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
    },
    Shrek: {
        Mon: {},
        Tue: {
            "2": {
                subject: "Computer System & Applicaion-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Wed: {
            "0": {
                subject: "Computer System & Applicaion-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Thurs: {
            "1": {
                subject: "Computer System & Applicaion-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Fri: {},
        Sat: {
            "0": {
                subject: "Computer System & Applicaion-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
    },
    "Captain Jack Sparrow": {
        Mon: {
            "1": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Commerce-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
            "3": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
        Tue: {
            "0": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Commerce-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Wed: {
            "1": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "M&L / E&D / Advertising",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "Foundation of Human Skills (FHS)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Thurs: {
            "1": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Foundation of Human Skills (FHS)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Fri: {
            "0": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "1": {
                subject: "Foundation of Human Skills (FHS)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "2": {
                subject: "Commerce-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Sat: {
            "0": {
                subject: "Foundation of Human Skills (FHS)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "2": {
                subject: "SHRM & HRP / IAPM / CRM",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
    },
    "Sarah Connor": {
        Mon: {
            "0": {
                subject: "Copy Writing",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "1": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Managerial Accounting (MA)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "3": {
                subject: "Financial Accounting -VI",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Tue: {
            "1": {
                subject: "Managerial Accounting (MA)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "Financial Accounting -VI",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Wed: {
            "0": {
                subject: "Managerial Accounting (MA)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "M&L / E&D / Advertising",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Thurs: {
            "1": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "2": {
                subject: "Copy Writing",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Fri: {
            "0": {
                subject: "E&D / Advertising / M&L",
                subtype: "Theory",
                department: "SY BMS",
            },
            "1": {
                subject: "Copy Writing",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "3": {
                subject: "Financial Accounting -VI",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Sat: {
            "0": {
                subject: "Copy Writing",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "Managerial Accounting (MA)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
    },
    "Tony Stark": {
        Mon: {
            "0": {
                subject: "Export Marketing-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
            "2": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Information Technology in Business management-I",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Tue: {
            "0": {
                subject: "Information Technology in Accountancy-I",
                subtype: "Theory",
                department: "SY BAF",
            },
            "1": {
                subject: "Commerce-I (Com-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Information Technology in Business management-I",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "Information Technology in Business management-I",
                subtype: "Theory",
                department: "SY BMS",
            },
        },
        Wed: {
            "0": {
                subject: "Commerce-I (Com-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Commerce-I (Com-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "3": {
                subject: "Information Technology in Accountancy-I",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
        Thurs: {
            "2": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
        Fri: {
            "0": {
                subject: "Information Technology in Accountancy-I",
                subtype: "Theory",
                department: "SY BAF",
            },
            "1": {
                subject: "Commerce-I (Com-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Accountancy & Financial Management-III (AFM-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "3": {
                subject: "Accountancy & Financial Management-III (AFM-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Sat: {
            "0": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Accountancy & Financial Management-III (AFM-III)",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "Information Technology in Business management-I",
                subtype: "Theory",
                department: "SY BMS",
            },
            "3": {
                subject: "Information Technology in Accountancy-I",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
    },
    "Indiana Jones": {
        Mon: {
            "0": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "1": {
                subject: "Financial Accounting -V",
                subtype: "Theory",
                department: "TY BAF",
            },
            "2": {
                subject: "Introduction & Element of Cost (Cost A/C)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "3": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
        Tue: {
            "0": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Introduction & Element of Cost (Cost A/C)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "3": {
                subject: "Financial Accounting -V",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Wed: {
            "0": {
                subject: "Introduction & Element of Cost (Cost A/C)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "1": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "Financial Accounting -V",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Thurs: {
            "1": {
                subject: "Financial Accounting -V",
                subtype: "Theory",
                department: "TY BAF",
            },
            "3": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Fri: {
            "2": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Sat: {
            "1": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "2": {
                subject: "SHRM & HRP / IAPM / CRM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Introduction & Element of Cost (Cost A/C)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
    },
    "Clarice Starling": {
        Mon: {
            "0": {
                subject: "IM / Risk Mgt / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Taxation -II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Management Application -II",
                subtype: "Theory",
                department: "TY BAF",
            },
            "3": {
                subject: "Direct & Indirect Taxation-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Tue: {
            "1": {
                subject: "IM / Risk Mgt / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "Taxation -II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "3": {
                subject: "Direct & Indirect Taxation-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Wed: {
            "0": {
                subject: "Risk Mgt / IM / IR",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Taxation",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Thurs: {
            "0": {
                subject: "Taxation -II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Direct & Indirect Taxation-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
            "3": {
                subject: "Management Application -II",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Fri: {
            "0": {
                subject: "IR / Risk Mgt / IM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Taxation -II",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Taxation",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
        Sat: {
            "1": {
                subject: "Direct & Indirect Taxation-I",
                subtype: "Theory",
                department: "TY BCOM",
            },
            "3": {
                subject: "Taxation",
                subtype: "Theory",
                department: "TY BAF",
            },
        },
    },
    "Ellen Ripley": {
        Mon: {
            "0": {
                subject: "Business Communication �I (BC-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "1": {
                subject: "Business Law (B. Law)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "2": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
        Tue: {
            "0": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Advertising Media Research (AMR)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Wed: {
            "1": {
                subject: "IAPM / CRM / SHRM & HRP",
                subtype: "Theory",
                department: "TY BMS",
            },
            "2": {
                subject: "Advertising Media Research (AMR)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
        },
        Thurs: {
            "1": {
                subject: "Advertising Media Research (AMR)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "3": {
                subject: "Business Communication �I (BC-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Fri: {
            "0": {
                subject: "Advertising Media Research (AMR)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "Business Communication �I (BC-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Sat: {
            "0": {
                subject: "CDM / SDM / HRP&CM",
                subtype: "Theory",
                department: "TY BMS",
            },
            "1": {
                subject: "Business Communication �I (BC-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "2": {
                subject: "SHRM & HRP / IAPM / CRM",
                subtype: "Theory",
                department: "TY BMS",
            },
        },
    },
    Aragorn: {
        Mon: {
            "0": {
                subject: "Media Studies (MS)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "1": {
                subject: "Agency Management (AM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "History of Media (HM)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "3": {
                subject: "Advertising-I",
                subtype: "Theory",
                department: "SY BCOM",
            },
        },
        Tue: {
            "0": {
                subject: "Agency Management (AM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "2": {
                subject: "Advertising-I",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "3": {
                subject: "Introduction to photography (ITP)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Wed: {
            "0": {
                subject: "Introduction to photography (ITP)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "1": {
                subject: "Advertising-I",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "2": {
                subject: "History of Media (HM)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "3": {
                subject: "Media Studies (MS)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Thurs: {
            "0": {
                subject: "Advertising-I",
                subtype: "Theory",
                department: "SY BCOM",
            },
            "1": {
                subject: "History of Media (HM)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Media Studies (MS)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
            "3": {
                subject: "Introduction to photography (ITP)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Fri: {
            "0": {
                subject: "History of Media (HM)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Agency Management (AM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "3": {
                subject: "Media Studies (MS)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
        Sat: {
            "1": {
                subject: "Agency Management (AM)",
                subtype: "Theory",
                department: "TY BAMMC",
            },
            "3": {
                subject: "Introduction to photography (ITP)",
                subtype: "Theory",
                department: "SY BAMMC",
            },
        },
    },
    "Lara Croft": {
        Mon: {},
        Tue: {
            "0": {
                subject: "Business Economics-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Wed: {
            "1": {
                subject: "Business Economics-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Thurs: {},
        Fri: {
            "0": {
                subject: "Business Economics-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Sat: {
            "2": {
                subject: "Business Economics-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
    },
    "James Bond": {
        Mon: {
            "0": {
                subject: "Accountancy & Financial Management-I(AFM-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Business Statistics (B. Statistics)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "3": {
                subject: "Elements of Fianancial Accounting-I (FA-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Tue: {
            "0": {
                subject: "Business Statistics (B. Statistics)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "1": {
                subject: "Financial Mgt.",
                subtype: "Theory",
                department: "TY BAF",
            },
            "2": {
                subject: "Elements of Fianancial Accounting-I (FA-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Wed: {
            "0": {
                subject: "Financial accounting-III",
                subtype: "Theory",
                department: "SY BAF",
            },
            "1": {
                subject: "Elements of Fianancial Accounting-I (FA-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "3": {
                subject: "Accountancy & Financial Management-I(AFM-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Thurs: {
            "0": {
                subject: "Elements of Fianancial Accounting-I (FA-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "1": {
                subject: "Accountancy & Financial Management-I(AFM-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "2": {
                subject: "Mathematics & Statistical Techniques-I (M&S-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "3": {
                subject: "Financial accounting-III",
                subtype: "Theory",
                department: "SY BAF",
            },
        },
        Fri: {
            "0": {
                subject: "Mathematics & Statistical Techniques-I (M&S-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "1": {
                subject: "Financial Mgt.",
                subtype: "Theory",
                department: "TY BAF",
            },
            "3": {
                subject: "Business Statistics (B. Statistics)",
                subtype: "Theory",
                department: "FY BMS",
            },
        },
        Sat: {
            "0": {
                subject: "Financial accounting-III",
                subtype: "Theory",
                department: "SY BAF",
            },
            "2": {
                subject: "Business Statistics (B. Statistics)",
                subtype: "Theory",
                department: "FY BMS",
            },
            "3": {
                subject: "Mathematics & Statistical Techniques-I (M&S-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
    },
    "Tyler Durden": {
        Mon: {
            "1": {
                subject: "Financial Accounting-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Tue: {},
        Wed: {
            "2": {
                subject: "Financial Accounting-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Thurs: {
            "0": {
                subject: "Financial Accounting-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Fri: {
            "1": {
                subject: "Financial Accounting-V",
                subtype: "Theory",
                department: "TY BCOM",
            },
        },
        Sat: {},
    },
    "Marty McFly": {
        Mon: {
            "0": {
                subject: "Fundamental of Mass Communication (FMC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "1": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "3": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Tue: {
            "0": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "1": {
                subject: "Fundamental of Mass Communication (FMC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "2": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
            "3": {
                subject: "Fundamental of Mass Communication (FMC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
        },
        Wed: {
            "0": {
                subject: "Foundation Course-I (FC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
            "3": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
        },
        Thurs: {
            "2": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "3": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Fri: {
            "1": {
                subject: "Foundation Course-I (FC-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "2": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BCOM",
            },
        },
        Sat: {
            "0": {
                subject: "Business Economics-I (B.Eco-I)",
                subtype: "Theory",
                department: "FY BAF",
            },
            "1": {
                subject: "Foundation Course-I (FC)",
                subtype: "Theory",
                department: "FY BAMMC",
            },
        },
    },
};

type subjectType = {
    subject: string;
    subtype: string;
    department: string;
};

function getSlots(number_of_lectures: number): number[] {
    const slots = Array.from({ length: number_of_lectures }, (_, i) => i);
    return slots;
}

const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

export default function ProfessorsPage() {
    const [professors, setProfessors] = useState<string[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useState<string>("");
    const [timeTable, setTimeTable] = useState(profData);
    const [filteredTimeTable, setFilteredTimeTable] = useState(null);

    const [numberOfLectures, setNumberOfLectures] = useState(0);
    const [slots, setSlots] = useState<number[]>([]);

    const getProfessorsTimeTable = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/professors/timetable`,
            { withCredentials: true }
        );
        // console.log("getProfessorsTimeTable", response.data);
        setTimeTable(response.data.timetable_data);
        setNumberOfLectures(response.data.number_of_lectures);
        const professors = Object.keys(response.data.timetable_data).sort();

        setProfessors(professors);
        setSelectedProfessor(professors[0]);
    };

    useEffect(() => {
        getProfessorsTimeTable();
    }, []);

    useEffect(() => {
        if (selectedProfessor !== "") {
            setFilteredTimeTable(timeTable[selectedProfessor]);
        }
    }, [selectedProfessor, timeTable]);

    useEffect(() => {
        setSlots(getSlots(numberOfLectures));
    }, [numberOfLectures]);

    return (
        <div className="h-full gap-3 flex flex-col">
            <div className="flex flex-grow gap-3">
                <div className="bg-white rounded-md w-1/4 flex items-center p-1.5 shadow-md">
                    <h1 className="text-2xl font-bold pl-4 text-primary-950 font-custom">
                        Professors
                    </h1>
                </div>
                <div className="flex w-1/3 bg-secondary p-1.5 rounded-md shadow-md">
                    <p className="text-sm my-auto w-3/5 text-center">
                        Select Professor:
                    </p>
                    <select
                        className="border border-stone-300 p-2 rounded-md w-full ml-1"
                        onChange={(e) => setSelectedProfessor(e.target.value)}
                    >
                        {professors.map((professor) => (
                            <option key={professor} value={professor}>
                                {professor}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="bg-secondary p-4 rounded-md flex flex-col items-center h-full shadow-lg overflow-y-auto">
                <div className="w-full h-full">
                    {filteredTimeTable ? (
                        <table className="w-full h-full table-fixed">
                            <thead>
                                <tr className="divide-x divide-gray-300">
                                    {days.map((day) => {
                                        return (
                                            <th
                                                key={day}
                                                className="p-1 text-center font-bold bg-gray-500 text-white h-10 font-custom"
                                            >
                                                {day}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {slots.map((lecNum) => {
                                    return (
                                        <tr key={lecNum}>
                                            {days.map((day) => {
                                                const isFreeLec =
                                                    filteredTimeTable[day][
                                                        lecNum
                                                    ]
                                                        ? false
                                                        : true;
                                                return (
                                                    <td
                                                        key={day + lecNum}
                                                        className={`border border-gray-400 p-0.5 text-center  hover:border-2 text-sm h-1/${slots.length} ${
                                                            isFreeLec
                                                                ? "bg-gray-100 hover:border-gray-400"
                                                                : "hover:bg-primary-100 hover:border-primary-700 hover:text-primary-900"
                                                        }`}
                                                    >
                                                        {filteredTimeTable[day][
                                                            lecNum
                                                        ] ? (
                                                            <ProfSlot
                                                                data={
                                                                    filteredTimeTable[
                                                                        day
                                                                    ][lecNum]
                                                                }
                                                            />
                                                        ) : (
                                                            <p className="text-sm font-medium text-gray-400">
                                                                Free Lecture
                                                            </p>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p>No time table</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ProfSlot({ data }: { data: subjectType }) {
    return (
        <>
            <p className="text-sm font-medium">{data.subject}</p>
            <p className="text-sm text-gray-600 mt-0.5">{data.department}</p>
            <p className="text-xs text-gray-600">({data.subtype})</p>
        </>
    );
}
